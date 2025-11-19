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
            .Where(p => p.ProductName.Contains(query) || p.ArticleNumber.Contains(query))
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

    public async Task<Product> CreatePartAsync(Product part)
    {
        _context.Products.Add(part);
        await _context.SaveChangesAsync();

        await _context.Entry(part).Reference(p => p.Category).LoadAsync();

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
}