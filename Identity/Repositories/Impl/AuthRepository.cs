using System;
using System.Threading.Tasks;
using Identity.Models;
using Microsoft.EntityFrameworkCore;

namespace Identity.Repositories.Impl;

public class AuthRepository(IdentityContext dbContext) : IAuthRepository
{
    public async Task<User?> GetByLogin(string login)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Login == login.ToLowerInvariant());
        
        return user;
    }

    public async Task<User?> GetUserById(Guid id)
    {
        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);
        
        return user;
    }

    public async Task<Authorization?> GetAuthorizationByUserId(Guid userId)
    {
        var auth = await dbContext.Authorizations
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.UserId == userId);
        
        return auth;
    }
    
    public async Task<int> CreateOrUpdateAuthorization(Authorization authorization)
    {
        var existingAuthorization = await dbContext.Authorizations
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.UserId == authorization.UserId);
        if (existingAuthorization != null)
        {
            dbContext.Update(authorization);
        }
        else
        {
            dbContext.Authorizations.Add(authorization);
        }
        
        return await dbContext.SaveChangesAsync();
    }
}