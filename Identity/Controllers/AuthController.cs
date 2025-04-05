using System.Threading.Tasks;
using Identity.DTO.Requests;
using Identity.DTO.Responses;
using Identity.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Controllers;

[ApiController]
[Route("auth")]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
[ProducesResponseType(StatusCodes.Status200OK)]
public class AuthController(IAuthService authService) : ControllerBase
{
    private const string CookieRefreshTokenFieldName = "refreshToken";
    
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var loginResponse = await authService.Login(loginRequest.Login, loginRequest.Password);
        if (loginResponse == null)
        {
            return new UnauthorizedResult();
        }

        Response.Cookies.Append(
            CookieRefreshTokenFieldName, 
            loginResponse.RefreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true
            });

        return Ok(new LoginResponse { AccessToken = loginResponse.AccessToken });
    }
    
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken(RefreshRequest refreshRequest)
    {
        if (!Request.Cookies.TryGetValue(CookieRefreshTokenFieldName, out var refreshToken))
        {
            return Unauthorized();
        }
        
        var refreshResponse = await authService.Refresh(refreshRequest.AccessToken, refreshToken);
        if (refreshResponse == null)
        {
            return Unauthorized();
        }
        
        Response.Cookies.Append(
            CookieRefreshTokenFieldName,
            refreshResponse.RefreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true
            });
        
        return Ok(new LoginResponse { AccessToken = refreshResponse.AccessToken });
    }
}