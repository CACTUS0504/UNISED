using System;
using Identity.Models;
using Microsoft.EntityFrameworkCore;
using NpgsqlTypes;

namespace Identity;
public class IdentityContext(DbContextOptions<IdentityContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var u = modelBuilder.Entity<User>();
        u.HasKey(t => t.Id);

        var a = modelBuilder.Entity<Authorization>();
        a.HasKey(t => t.UserId);
        a.HasOne<User>()
            .WithOne()
            .HasForeignKey<Authorization>(t => t.UserId);
        
        // Добавление пользователя admin/admin при создании БД
        // Данная сущность используется только для создания стартовых пользователей системы и после этого должна быть
        // сразу удалена
        var user = new User
        {
            Id = Guid.NewGuid(), Login = "admin", IsBlocked = false,
            AccessLevel = 1, Name = "admin admin",
            Password = "AQAAAAIAAYagAAAAELbJ+FOCGTBw7Qun3tOE3wYX3AQn4UtRtEWiyIK1CQmsAGcBk0jfoHmiRuElc5h6Yg=="
        };
        modelBuilder.Entity<User>().HasData(user);
    }
    
    public DbSet<User> Users { get; init; }
    public DbSet<Authorization> Authorizations { get; init; }
}