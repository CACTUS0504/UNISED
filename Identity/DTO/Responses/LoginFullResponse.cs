namespace Identity.DTO.Responses;

public record LoginFullResponse
{
    public required string AccessToken { get; set; }

    public required string RefreshToken { get; set; }
}