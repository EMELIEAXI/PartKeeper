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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Category>().HasData(
        new Category { CategoryId = 1, CategoryName = "Wire" },
        new Category { CategoryId = 2, CategoryName = "Accessories" }
        );

        modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    ProductId = 1,
                    ArticleNumber = "19446",
                    ProductName = "Stållina",
                    Description = "Stållina för diverse användning",
                    CategoryId = 1,
                    Quantity = 100,
                    Location = "A1",
                    MinimumStock = 10,
                    CreatedAt = new DateTime(2024, 01, 01)
                },
                new Product
                {
                    ProductId = 2,
                    ArticleNumber = "45237",
                    ProductName = "Linledare",
                    Description = "Ledare för lina",
                    CategoryId = 2,
                    Quantity = 50,
                    Location = "B2",
                    MinimumStock = 5,
                    CreatedAt = new DateTime(2024, 01, 01)
                },
                new Product
                {
                    ProductId = 3,
                    ArticleNumber = "124639",
                    ProductName = "Knappar",
                    Description = "Förpackning med knappar",
                    CategoryId = 2,
                    Quantity = 200,
                    Location = "B3",
                    MinimumStock = 20,
                    CreatedAt = new DateTime(2024, 01, 01)
                }
                    );
    }
}