using System;
using System.Threading.Tasks;
using Identity.Models;

namespace Identity.Repositories;

public interface IAuthRepository
{
    public Task<User?> GetByLogin(string login);
    public Task<User?> GetUserById(Guid id);
    public Task<Authorization?> GetAuthorizationByUserId(Guid userId);
    public Task<int> CreateOrUpdateAuthorization(Authorization authorization);
}