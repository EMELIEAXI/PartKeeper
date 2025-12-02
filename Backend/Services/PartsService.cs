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

    public async Task<IEnumerable<Product>> GetLowStockAsync(string? search, string sort)
    {
        var query = _context.Products
            .Where(p => p.Quantity < p.MinimumStock)
            .AsQueryable();

        // Sökning
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p =>
                p.ProductName.Contains(search) ||
                p.ArticleNumber.Contains(search)
            );
        }

        // Sortering
        sort = sort?.ToLower() ?? "asc";
        query = sort switch
        {
            "desc" => query.OrderByDescending(p => p.Quantity - p.MinimumStock),
            _ => query.OrderBy(p => p.Quantity - p.MinimumStock)
        };

        return await query.ToListAsync();
    }

    public async Task<object> GetFilteredPagedPartsAsync(
        string? search,
        string? sortBy,
        string? sortOrder,
        int? categoryId,
        bool? inStock,
        string? name,
        string? articleNumber,
        int page,
        int pageSize)
    { 
        var query = _context.Products
            .Include(p => p.Category)
            .AsQueryable();

        // 🔍 Dynamisk filtrering ---------------------------------------------

        // Fritext-sökning
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p =>
                p.ProductName.ToLower().Contains(search) ||
                p.ArticleNumber.ToLower().Contains(search) ||
                p.Category.CategoryName.ToLower().Contains(search));

        // Filtrera på kategori
        if (categoryId.HasValue)
            query = query.Where(p => p.CategoryId == categoryId);

        // Lagerstatus (inStock = true → Quantity > 0)
        if (inStock.HasValue)
        {
            query = inStock.Value
                ? query.Where(p => p.Quantity > 0)
                : query.Where(p => p.Quantity == 0);
        }

        // Filtrera på namn (delmatchning)
        if (!string.IsNullOrWhiteSpace(name))
            query = query.Where(p => p.ProductName.Contains(name));

        // Filtrera på artikelnummer (delmatchning)
        if (!string.IsNullOrWhiteSpace(articleNumber))
            query = query.Where(p => p.ArticleNumber.Contains(articleNumber));

        // 🔽 Sortering --------------------------------------------------------
        sortBy = sortBy?.ToLower() ?? "productname";  // default
        sortOrder = sortOrder?.ToLower() ?? "asc";    // default

        query = (sortBy, sortOrder) switch
        {
            ("productname", "asc") => query.OrderBy(p => p.ProductName),
            ("productname", "desc") => query.OrderByDescending(p => p.ProductName),

            ("articlenumber", "asc") => query.OrderBy(p => p.ArticleNumber),
            ("articlenumber", "desc") => query.OrderByDescending(p => p.ArticleNumber),

            ("quantity", "asc") => query.OrderBy(p => p.Quantity),
            ("quantity", "desc") => query.OrderByDescending(p => p.Quantity),

            ("category", "asc") => query.OrderBy(p => p.Category.CategoryName),
            ("category", "desc") => query.OrderByDescending(p => p.Category.CategoryName),

            _ => query.OrderBy(p => p.ProductId) // fallback
        };
        // 📊 Totalt antal
        var totalItems = await query.CountAsync();
        var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

        // 📦 Pagination + dto
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new ProductReadDto
            {
                Id = p.ProductId,
                ProductName = p.ProductName,
                ArticleNumber = p.ArticleNumber,
                Quantity = p.Quantity,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.CategoryName,
                Description = p.Description,
                Location = p.Location,
                MinimumStock = p.MinimumStock
            })
            .ToListAsync();

        return new
        {
            currentPage = page,
            pageSize,
            totalItems,
            totalPages,
            items
        };

    }
}
