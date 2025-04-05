using System;
using System.ComponentModel.DataAnnotations;

namespace Identity.Models;

public class Authorization
{
    [Key]
    public Guid UserId { get; set; }

    public string RefreshToken { get; set; }
    
    public DateTime? RefreshTokenExpiry { get; set; }
}