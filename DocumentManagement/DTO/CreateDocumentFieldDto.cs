using System.ComponentModel.DataAnnotations;

namespace DocumentManagement.DTO;

public class CreateDocumentFieldDTO
{
    [Required(ErrorMessage = "FieldName is required")]
    public string FieldName { get; set; }

    [Required(ErrorMessage = "FieldType is required")]
    public string FieldType { get; set; }

    public bool IsRequired { get; set; } = false;

    public string? Description { get; set; }
}