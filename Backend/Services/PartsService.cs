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
        await _context.Products.ToListAsync();

    public async Task<List<Product>> SearchPartsAsync(string query) =>
        await _context.Products
            .Where(p => p.ProductName.ToLower().Contains(query.ToLower()) || p.ArticleNumber.Contains(query))
            .ToListAsync();

    public async Task<Product> GetPartByIdAsync(int id)
    {
        var part = await _context.Products.FindAsync(id);
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
            Quantity = dto.Quantity
        };

        _context.Products.Add(part);
        await _context.SaveChangesAsync();
        return part;
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

    public async Task<Product?> UpdatePartAsync(int id, ProductUpdateDto dto)
    {
        var part = await _context.Products.FindAsync(id);
        if (part == null) return null;

        part.ProductName = dto.ProductName;
        part.ArticleNumber = dto.ArticleNumber;
        part.Quantity = dto.Quantity;

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
}