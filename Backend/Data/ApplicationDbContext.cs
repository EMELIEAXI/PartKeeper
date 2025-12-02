using LagerWebb.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<ChangeLog> ChangeLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Product>()
    .HasOne(p => p.Category)
    .WithMany(c => c.Products)
    .HasForeignKey(p => p.CategoryId)
    .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Category>().HasData(
            new Category { CategoryId = 1, CategoryName = "Abus" },
            new Category { CategoryId = 2, CategoryName = "Gigasense" },
            new Category { CategoryId = 3, CategoryName = "Dematek" }
        );

        builder.Entity<Product>().HasData(
            new Product
            {
                ProductId = 1,
                ProductName = "Stållina",
                ArticleNumber = "19446",
                CategoryId = 1,
                Quantity = 50,
                MinimumStock = 10
            },

             new Product
             {
                 ProductId = 2,
                 ProductName = "Linledare",
                 ArticleNumber = "45237",
                 CategoryId = 2,
                 Quantity = 5,
                 MinimumStock = 10
             },
             new Product
             {
                 ProductId = 3,
                 ProductName = "Knappar",
                 ArticleNumber = "124639",
                 CategoryId = 3,
                 Quantity = 5,
                 MinimumStock = 4

             }
            );
    }
}