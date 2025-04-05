using Identity;
using Identity.JWT;
using Identity.Models;
using Identity.Repositories;
using Identity.Repositories.Impl;
using Identity.Services;
using Identity.Services.Impl;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Internal;
using NLog.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddNLog();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(nameof(JwtOptions)));

builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks().AddNpgSql(builder.Configuration.GetConnectionString("default")!);
builder.Services.AddControllers();

var allowedOrigins = builder.Configuration.GetSection("CorsOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy => policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins(allowedOrigins)
        .WithExposedHeaders("Content-Disposition")
        .AllowCredentials());
});

builder.Services.AddDbContext<IdentityContext>(o => 
    o.UseNpgsql(builder.Configuration.GetConnectionString("default")));
builder.Services.AddSingleton<ISystemClock, SystemClock>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapHealthChecks("identity/hcheck");
app.MapControllers();

app.Run();