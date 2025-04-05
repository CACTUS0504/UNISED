namespace Identity.DTO.Responses;

public record LoginResponse
{
    public required string AccessToken { get; set; }
}