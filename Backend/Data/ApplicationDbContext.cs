using System.ComponentModel;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Product>()
            .Ignore(p => p.Category)
            .Ignore(p => p.Transactions);

        builder.Entity<Category>().HasData(
            new Category { CategoryId = 1, CategoryName = "Kategori1" },
            new Category { CategoryId = 2, CategoryName = "Kategori2" },
            new Category { CategoryId = 3, CategoryName = "Kategori3" }
        );

        builder.Entity<Product>().HasData(
            new Product
            {
                ProductId = 1,
                ProductName = "Stållina",
                ArticleNumber = "19446",
                CategoryId = 1,
            },

             new Product
             {
                 ProductId = 2,
                 ProductName = "Linledare",
                 ArticleNumber = "45237",
                 CategoryId = 2,
             },
             new Product
             {
                 ProductId = 3,
                 ProductName = "Knappar",
                 ArticleNumber = "124639",
                 CategoryId = 2,

             }
            );
    }
}