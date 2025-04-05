using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Identity.Models;
using Microsoft.IdentityModel.Tokens;

namespace Identity.JWT;

public static class JwtGenerator
{
    public static string GenerateJwtToken(User user, JwtOptions options)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Name, user.Name),
            new Claim(ClaimTypes.Role, user.AccessLevel.ToString())
        };
        
        var secretKey = Encoding.UTF8.GetBytes(options.SecretKey);
        var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey),
            SecurityAlgorithms.HmacSha256Signature);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.Add(options.AccessTokenExpirationTime),
            SigningCredentials = signingCredentials,
        };

        if (options.Issuer != null)
        {
            tokenDescriptor.Issuer = options.Issuer;
        }
        
        if (options.Audience != null)
        {
            tokenDescriptor.Audience = options.Audience;
        }
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    
    public static string GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        using (var numberGenerator = RandomNumberGenerator.Create())
        {
            numberGenerator.GetBytes(randomNumber);
        }

        return Base64UrlEncoder.Encode(Convert.ToBase64String(randomNumber));
    }
}