namespace Identity.JWT;

public class LoginResult(string token)
{
    public string Token { get;} = token;
}