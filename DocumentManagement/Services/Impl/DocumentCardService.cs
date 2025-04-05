using DocumentManagement.Models;
using MongoDB.Driver;

namespace DocumentManagement.Services.Impl;

public class DocumentCardService : IDocumentCardService
{
    private readonly IMongoCollection<DocumentCard> _collection;

    public DocumentCardService(IMongoDatabase database)
    {
        _collection = database.GetCollection<DocumentCard>("documents");
    }

    public async Task<DocumentCard> CreateAsync(DocumentCard document)
    {
        await _collection.InsertOneAsync(document);
        return document;
    }

    public async Task<List<DocumentCard>> GetByTypeAsync(string typeId)
    {
        return await _collection.Find(d => d.TypeId == typeId).ToListAsync();
    }

    public async Task<DocumentCard> GetByIdAsync(string id)
    {
        return await _collection.Find(t => t.Id == id).FirstOrDefaultAsync();
    }

    public async Task<DocumentCard> UpdateAsync(string id, DocumentCard document)
    {
        await _collection.ReplaceOneAsync(d => d.Id == id, document);
        return document;
    }
}