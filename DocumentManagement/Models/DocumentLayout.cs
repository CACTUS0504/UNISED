using System.ComponentModel.DataAnnotations;

namespace DocumentManagement.Models;

public class DocumentLayout
{
    [Required(ErrorMessage = "Tabs are required")]
    [MinLength(1, ErrorMessage = "Requires at least one tab")]
    public List<TabConfig> Tabs { get; set; } = new();
}