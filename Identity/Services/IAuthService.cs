using System.Threading.Tasks;
using Identity.DTO.Responses;

namespace Identity.Services;

public interface IAuthService
{
    Task<LoginFullResponse?> Login(string login, string password);
    Task<LoginFullResponse?> Refresh(string accessToken, string refreshToken);
}