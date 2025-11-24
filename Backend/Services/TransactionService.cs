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
            throw new KeyNotFoundException("Produkt hittades inte.");

        var newQuantity = product.Quantity + dto.QuantityChange;
        if (newQuantity < 0)
            throw new InvalidOperationException("Lagret kan inte bli negativt.");

        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            throw new UnauthorizedAccessException("Ingen inloggad användare kunde identifieras.");

        var transaction = new Transaction
        {
            ProductId = dto.ProductId,
            QuantityChange = dto.QuantityChange,
            NewQuantity = newQuantity,
            TransactionType = dto.TransactionType,
            Comment = dto.Comment,
            UserId = userId,
            TimeStamp = DateTime.UtcNow
        };

        product.Quantity = newQuantity;

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return transaction;
    }

    public async Task<List<Transaction>> GetTransactionsAsync()
    {
        return await _context.Transactions
            .Include(t => t.Product)
            .Include(t => t.User)
            .OrderByDescending(t => t.TimeStamp)
            .ToListAsync();
    }
}
