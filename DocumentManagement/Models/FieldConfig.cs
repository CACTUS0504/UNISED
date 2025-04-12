using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DocumentManagement.Models;

public class FieldConfig
{
    public string Name { get; set; }
    public int Order { get; set; }
}