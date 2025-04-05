using DocumentManagement.Models;

namespace DocumentManagement.Services;

public interface IDocumentCardTypeService
{
    public Task<DocumentCardType> CreateAsync(DocumentCardType type);

    public Task<List<DocumentCardType>> GetAllAsync();

    public Task<DocumentCardType> GetByIdAsync(string id);
}