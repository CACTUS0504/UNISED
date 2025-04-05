using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DocumentManagement.Models;

// Метаданные поля типа карточки, за позиционирование поля на типе карточки отвечает класс CardTypeFieldLayout
public class DocumentCardTypeField
{
    public string Name { get; set; }
    
    public string FieldType { get; set; }
    
    public bool IsRequired { get; set; }
    
    public string? Description { get; set; }
}