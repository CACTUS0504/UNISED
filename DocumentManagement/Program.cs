using AutoMapper;
using DocumentManagement;
using DocumentManagement.DTO;
using DocumentManagement.Models;
using DocumentManagement.Services;
using DocumentManagement.Services.Impl;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDBSettings"));

builder.Services.AddScoped<IDocumentCardTypeService, DocumentCardTypeService>();
builder.Services.AddScoped<IDocumentCardService, DocumentCardService>();

builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDBSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddScoped(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var settings = sp.GetRequiredService<IOptions<MongoDBSettings>>().Value;
    return client.GetDatabase(settings.DatabaseName);
});

builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Создание уникальных индексов
// Todo: вынести в отдельный класс
using (var scope = app.Services.CreateScope())
{
    var database = scope.ServiceProvider.GetRequiredService<IMongoDatabase>();
    
    // Для типов документов - уникальное имя
    var documentTypesCollection = database.GetCollection<DocumentCardType>("documentTypes");
    var documentTypeIndexKeys = Builders<DocumentCardType>.IndexKeys.Ascending(x => x.Name);
    var documentTypeIndexOptions = new CreateIndexOptions { Unique = true };
    var documentTypeIndexModel = new CreateIndexModel<DocumentCardType>(documentTypeIndexKeys, documentTypeIndexOptions);
    await documentTypesCollection.Indexes.CreateOneAsync(documentTypeIndexModel);
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowFrontend");

app.Run();

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // Document mappings
        CreateMap<CreateDocumentDTO, DocumentCard>();
    }
}