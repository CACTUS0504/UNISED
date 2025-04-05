using System.Text.Json.Nodes;
using DocumentManagement.Models;
using MongoDB.Bson;
using MongoDB.Bson.IO;

namespace DocumentManagement.DTO.Responses;

public class GetDocumentCardResponse
{
    public string Id { get; set; }
    public string TypeId { get; set; }
    public JsonNode? Data { get; set; }
    public Guid CreatedById { get; set; }
    public bool IsDeleted { get; set; }

    public static GetDocumentCardResponse FromDocumentCard(DocumentCard documentCard)
    {
        return new GetDocumentCardResponse
        {
            Id = documentCard.Id,
            TypeId = documentCard.TypeId,
            Data = JsonNode.Parse(documentCard.Data.ToJson()),
        };
    }
}