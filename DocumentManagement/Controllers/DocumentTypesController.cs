using DocumentManagement.DTO;
using DocumentManagement.Models;
using DocumentManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace DocumentManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DocumentTypesController(IDocumentCardTypeService documentCardTypeService) : ControllerBase
{
    // Добавить пагинацию
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var types = await documentCardTypeService.GetAllAsync();
        return Ok(types);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var documentCardType = await documentCardTypeService.GetByIdAsync(id);
        if (documentCardType == null)
        {
            return NotFound();
        }
        
        return Ok(documentCardType);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDocumentCardTypeDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Todo: вынести в DTO
        var documentType = new DocumentCardType
        {
            Name = dto.Name,
            Description = dto.Description,
            Fields = dto.Fields,
            Layout = dto.Layout,
        };
        
        var createdType = await documentCardTypeService.CreateAsync(documentType);
        return CreatedAtAction(
            nameof(GetById),
            new { id = documentType.Id },
            documentType);
    }
}