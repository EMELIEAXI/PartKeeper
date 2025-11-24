using LagerWebb.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
public class TransactionService
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TransactionService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Transaction> CreateTransactionAsync(TransactionCreateDto dto)
    {
        var product = await _context.Products.FindAsync(dto.ProductId);
        if (product == null)
            throw new Exception("Produkten hittades inte.");

        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            throw new Exception("Ingen inloggad användare kunde identifieras.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
            throw new Exception("Användaren hittades inte.");

        if (user == null)
            throw new Exception("Användaren hittades inte.");

        var newQuantity = product.Quantity + dto.QuantityChange;
        product.Quantity = newQuantity;

        var transaction = new Transaction
        {
            ProductId = product.ProductId,
            UserId = user.Id,
            QuantityChange = dto.QuantityChange,
            NewQuantity = newQuantity,
            TransactionType = dto.QuantityChange > 0 ? "Add" : "Remove",
            Comment = dto.Comment,
            TimeStamp = DateTime.UtcNow
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        // 🔥 Ladda om med Include(User) + Include(Product)
        return await _context.Transactions
            .Include(t => t.User)
            .Include(t => t.Product)
            .FirstAsync(t => t.TransactionId == transaction.TransactionId);
    }

    public async Task<List<TransactionHistoryDto>> GetTransactionsAsync()
    {
        return await _context.Transactions
            .Include(t => t.Product)
            .Include(t => t.User)
            .OrderByDescending(t => t.TimeStamp)
            .Select(t => new TransactionHistoryDto
            {
                TransactionId = t.TransactionId,
                ProductId = t.ProductId,
                ProductName = t.Product.ProductName,
                QuantityChange = t.QuantityChange,
                NewQuantity = t.NewQuantity,
                TransactionType = t.TransactionType,
                Comment = t.Comment,
                User = t.User.FirstName + " " + t.User.LastName,
                TimeStamp = t.TimeStamp
            })
            .ToListAsync();
    }
}
