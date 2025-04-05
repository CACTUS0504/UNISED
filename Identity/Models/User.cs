using System;
using System.ComponentModel.DataAnnotations;

namespace Identity.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }

    public string Login { get; set; }
    
    public string Password { get; set; }
    
    public string Name { get; set; }
    
    public int AccessLevel { get; set; }
    
    public bool IsBlocked { get; set; }
    
    public DateTime? Blocked { get; set; }
}