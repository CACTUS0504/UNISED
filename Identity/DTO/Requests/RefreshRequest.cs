namespace Identity.DTO.Requests;

public record RefreshRequest
{
    public required string AccessToken { get; set; }
}