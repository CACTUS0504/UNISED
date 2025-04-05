using System.Text.Json;
using AutoMapper;
using DocumentManagement.DTO;
using DocumentManagement.DTO.Responses;
using DocumentManagement.Models;
using DocumentManagement.Services;
using DocumentManagement.Validators;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace DocumentManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DocumentsController(
    IDocumentCardTypeService documentCardTypeService, 
    IDocumentCardService documentCardService,
    IMapper mapper) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDocumentDTO createDocumentDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Проверка типа документа
        var docType = await documentCardTypeService.GetByIdAsync(createDocumentDto.TypeId);
        if (docType == null)
        {
            return BadRequest("Invalid document type");
        }

        // Валидация данных по полям типа документа
        foreach (var field in docType.Fields.Where(f => f.IsRequired))
        {
            if (!createDocumentDto.Data.ContainsKey(field.Name))
            {
                return BadRequest($"Missing required field: {field.Name}");
            }
        }

        var document = new DocumentCard
        {
            TypeId = createDocumentDto.TypeId,
            Data = BsonDocument.Parse(JsonSerializer.Serialize(createDocumentDto.Data)),
            Attachments = createDocumentDto.Attachments,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        var createdDoc = await documentCardService.CreateAsync(
            document);

        return Ok(GetDocumentCardResponse.FromDocumentCard(createdDoc));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var document = await documentCardService.GetByIdAsync(id);
        if (document == null) return NotFound();
        return Ok(GetDocumentCardResponse.FromDocumentCard(document));
    }

    [HttpGet("type/{typeId}")]
    public async Task<IActionResult> GetByType(string typeId)
    {
        var documents = await documentCardService.GetByTypeAsync(typeId);
        return Ok(documents.Select(GetDocumentCardResponse.FromDocumentCard));
    }
}