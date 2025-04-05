using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DocumentManagement.Models;

// Класс конкретного экземпляра карточки заданного типа
public class DocumentCard
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string TypeId { get; set; }

    public BsonDocument Data { get; set; }
    
    // Планируется добавить worker, который будет дропать файлы из s3 хранилища
    public bool IsDeleted { get; set; } = false;
    
    // Ссылка на чела из микросервиса авторизации
    [BsonRepresentation(BsonType.ObjectId)]
    public string CreatedById { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Ссылка на чела из микросервиса авторизации
    [BsonRepresentation(BsonType.ObjectId)]
    public string UpdatedById { get; set; }
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Id прикрепрёллых файлов, хранятся в микросервисе управления фалами
    [BsonRepresentation(BsonType.ObjectId)]
    public List<string> Attachments { get; set; }
}