using System.ComponentModel.DataAnnotations;
using DocumentManagement.Models;
using DocumentManagement.Validators;

namespace DocumentManagement.DTO;

public class CreateDocumentCardTypeDTO
{
    [Required(ErrorMessage = "TypeName is required")]
    public string Name { get; set; }

    public string? Description { get; set; }

    public List<DocumentCardTypeField> Fields { get; set; } = new();
    
    [ValidateCardLayout]
    public DocumentLayout Layout { get; set; }
}