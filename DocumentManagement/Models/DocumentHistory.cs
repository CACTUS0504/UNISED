using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DocumentManagement.Models;

public class DocumentHistory
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string DocumentId { get; set; }

    public Dictionary<string, FieldChange> Changes { get; set; } = new();
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
    
    [BsonRepresentation(BsonType.ObjectId)]
    public string ChangedBy { get; set; } // ID пользователя
    
    // Ссылка на чела из микросервиса авторизации
    public Guid ChangedById { get; set; }
}