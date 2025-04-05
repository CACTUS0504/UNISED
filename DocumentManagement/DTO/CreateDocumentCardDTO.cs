using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using DocumentManagement.Models;
using Microsoft.VisualBasic.FileIO;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DocumentManagement.DTO;

public class CreateDocumentDTO
{
    [Required(ErrorMessage = "TypeId is required")]
    public string TypeId { get; set; }

    [Required(ErrorMessage = "Data is required")]
    [ValidateFieldTypes]
    public Dictionary<string, object> Data { get; set; } = new();

    public List<string> Attachments { get; set; } = new();
}

// Кастомный атрибут валидации
public class ValidateFieldTypesAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext context)
    {
        var fieldValues = value as Dictionary<string, object>;
        var dbContext = context.GetService<IMongoDatabase>();
        
        var typeId = (context.ObjectInstance as CreateDocumentDTO)?.TypeId;
        if (string.IsNullOrEmpty(typeId))
        {
            return new ValidationResult("Document type must be specified");
        }

        var docType = dbContext.GetCollection<DocumentCardType>("documentTypes")
            .Find(t => t.Id == typeId).FirstOrDefault();

        if (docType == null)
        {
            return new ValidationResult("Invalid document type");
        }

        var errors = new List<string>();

        // Проверка обязательных полей
        foreach (var fieldDef in docType.Fields.Where(f => f.IsRequired))
        {
            if (!fieldValues.ContainsKey(fieldDef.Name))
            {
                errors.Add($"Field '{fieldDef.Name}' is required");
            }
        }

        // Валидация типов
        foreach (var kvp in fieldValues)
        {
            var fieldDef = docType.Fields.FirstOrDefault(f => f.Name == kvp.Key);
            if (fieldDef == null) continue;

            if (!IsValidType(kvp.Value, fieldDef.FieldType))
            {
                errors.Add($"Field '{kvp.Key}' must be of type {fieldDef.FieldType}");
            }
        }

        return errors.Any() 
            ? new ValidationResult(string.Join(", ", errors)) 
            : ValidationResult.Success;
    }

    private bool IsValidType(object value, string expectedType)
    {
        return expectedType switch
        {
            "datetime" => 
                value is DateTime ||
                (value is JsonElement je && je.TryGetDateTime(out _)) ||
                (value is string str && DateTime.TryParse(str, out _)),
            
            "string" => 
                value is string || 
                (value is JsonElement je && je.ValueKind == JsonValueKind.String),
                
            "number" => 
                value is int or long or double or decimal ||
                (value is JsonElement je && je.ValueKind == JsonValueKind.Number),
                
            "bool" => 
                value is bool ||
                (value is JsonElement je && (je.ValueKind == JsonValueKind.True || je.ValueKind == JsonValueKind.False)),
                
            _ => false
        };
    }
}