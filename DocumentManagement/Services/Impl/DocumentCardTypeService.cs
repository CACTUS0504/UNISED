using DocumentManagement.Models;
using MongoDB.Driver;

namespace DocumentManagement.Services.Impl;

public class DocumentCardTypeService : IDocumentCardTypeService
{
    private readonly IMongoCollection<DocumentCardType> _collection;

    public DocumentCardTypeService(IMongoDatabase database)
    {
        _collection = database.GetCollection<DocumentCardType>("documentTypes");
    }

    public async Task<DocumentCardType> CreateAsync(DocumentCardType type)
    {
        await _collection.InsertOneAsync(type);
        return type;
    }

    public async Task<List<DocumentCardType>> GetAllAsync()
    {
        return await _collection.Find(_ => true).ToListAsync();
    }

    public async Task<DocumentCardType> GetByIdAsync(string id)
    {
        return await _collection.Find(t => t.Id == id).FirstOrDefaultAsync();
    }
}