namespace Identity.DTO.Requests;

public record LoginRequest
{
    public required string Login { get; set; }

    public required string Password { get; set; }
}