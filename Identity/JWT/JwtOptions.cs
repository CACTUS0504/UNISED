using System;

namespace Identity.JWT;

public class JwtOptions
{
    public TimeSpan AccessTokenExpirationTime { get; set; } = TimeSpan.FromMinutes(60);
    public TimeSpan RefreshTokenExpirationTime { get; set; } = TimeSpan.FromDays(180);
    public string? Issuer { get; set; }
    public string? Audience { get; set; }
    public string SecretKey { get; set; }
}