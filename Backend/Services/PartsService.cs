using LagerWebb.Models.DTOs;
using Microsoft.EntityFrameworkCore;

public class PartsService
{
    private readonly ApplicationDbContext _context;

    public PartsService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllPartsAsync() =>
        await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .ToListAsync();

    public async Task<List<Product>> SearchPartsAsync(string query) =>
        await _context.Products
            .Include(p => p.Category)
            .Where(p =>
                p.ProductName.ToLower().Contains(query.ToLower()) ||
                p.ArticleNumber.Contains(query))
            .ToListAsync();

    public async Task<Product> GetPartByIdAsync(int id)
    {
        var part = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.ProductId == id);

        if (part == null)
            throw new KeyNotFoundException($"Part with id {id} not found.");

        return part;
    }

    public async Task<Product> CreatePartAsync(ProductCreateDto dto)
    {
        var part = new Product
        {
            ProductName = dto.ProductName,
            ArticleNumber = dto.ArticleNumber,
            Quantity = dto.Quantity,
            CategoryId = dto.CategoryId,
            Location = dto.Location,
            MinimumStock = dto.MinimumStock,
            Description = dto.Description,
        };

        _context.Products.Add(part);
        await _context.SaveChangesAsync();

        await _context.Entry(part).Reference(p => p.Category).LoadAsync();

        return part;
    }

    public async Task<Product?> UpdatePartAsync(int id, ProductUpdateDto dto)
    {
        var part = await _context.Products.FindAsync(id);
        if (part == null) return null;

        part.ProductName = dto.ProductName;
        part.ArticleNumber = dto.ArticleNumber;
        part.Quantity = dto.Quantity;
        part.CategoryId = dto.CategoryId;
        part.Description = dto.Description;
        part.Location = dto.Location;
        part.MinimumStock = dto.MinimumStock;

        await _context.SaveChangesAsync();
        return part;
    }

    public async Task<bool> DeletePartAsync(int id)
    {
        var part = await _context.Products.FindAsync(id);
        if (part == null) return false;

        _context.Products.Remove(part);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IncreaseStockAsync(int id)
    {
        var part = await _context.Products.FindAsync(id);
        if (part == null) return false;

        part.Quantity++;
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DecreaseStockAsync(int id)
    {
        var part = await _context.Products.FindAsync(id);
        if (part == null) return false;

        if (part.Quantity <= 0) return false;

        part.Quantity--;
        await _context.SaveChangesAsync();

        return true;
    }
}
