using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DocumentManagement.Models;

public class DocumentCardType
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DocumentLayout Layout { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<DocumentCardTypeField> Fields { get; set; } = new();
}