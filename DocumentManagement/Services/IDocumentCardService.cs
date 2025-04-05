using DocumentManagement.Models;

namespace DocumentManagement.Services;

public interface IDocumentCardService
{
    public Task<DocumentCard> CreateAsync(DocumentCard document);
    public Task<List<DocumentCard>> GetByTypeAsync(string typeId);
    public Task<DocumentCard> GetByIdAsync(string id);
    public Task<DocumentCard> UpdateAsync(string id, DocumentCard document);
}