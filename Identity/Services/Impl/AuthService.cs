using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Identity.DTO.Responses;
using Identity.JWT;
using Identity.Models;
using Identity.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Identity.Services.Impl;

public class AuthService(IAuthRepository authRepository, IPasswordHasher<User> passwordHasher,
    IOptions<JwtOptions> options, ISystemClock systemClock) : IAuthService
{
    public async Task<LoginFullResponse?> Login(string login, string password)
    {
        var user = await authRepository.GetByLogin(login);
        if (user == null)
        {
            return null;
        }

        var result = passwordHasher.VerifyHashedPassword(user, user.Password, password);
        if (result != PasswordVerificationResult.Success)
        {
            return null;
        }
        
        var accessToken = JwtGenerator.GenerateJwtToken(user, options.Value);
        var refreshToken = JwtGenerator.GenerateRefreshToken();

        var auth = new Authorization
        {
            UserId = user.Id, 
            RefreshToken = refreshToken,
            RefreshTokenExpiry = systemClock.UtcNow.UtcDateTime.Add(options.Value.RefreshTokenExpirationTime)
        };
        await authRepository.CreateOrUpdateAuthorization(auth);
        
        return new LoginFullResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public async Task<LoginFullResponse?> Refresh(string accessToken, string refreshToken)
    {
        var userIdClaim = GetTokenPrincipal(accessToken)?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim is null)
            return null;
        
        var user = await authRepository.GetUserById(Guid.Parse(userIdClaim));
        if (user == null)
        {
            return null;
        }
        
        var authorization = await authRepository.GetAuthorizationByUserId(user.Id);
        if (authorization is null || authorization.RefreshToken != refreshToken
                                  || authorization.RefreshTokenExpiry < systemClock.UtcNow.UtcDateTime)
        {
            return null;
        }

        authorization.RefreshToken = JwtGenerator.GenerateRefreshToken();
        authorization.RefreshTokenExpiry = systemClock.UtcNow.UtcDateTime.Add(options.Value.RefreshTokenExpirationTime);
        await authRepository.CreateOrUpdateAuthorization(authorization);

        return new LoginFullResponse
        {
            AccessToken = JwtGenerator.GenerateJwtToken(user, options.Value), 
            RefreshToken = authorization.RefreshToken
        };
    }
    
    
    private ClaimsPrincipal? GetTokenPrincipal(string token)
    {
        var tvp = new TokenValidationParameters
        {
            RequireAudience = false,
            ValidateAudience = false,
            ValidateIssuer = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.Value.SecretKey))
        };

        return new JwtSecurityTokenHandler().ValidateToken(token, tvp, out _);
    }
}