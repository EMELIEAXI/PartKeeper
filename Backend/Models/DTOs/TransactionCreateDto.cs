namespace LagerWebb.Models.DTOs
{
    public class TransactionCreateDto
    {
        public int ProductId { get; set; }
        public int QuantityChange { get; set; }
        public string TransactionType { get; set; } = null!;
        public string? Comment { get; set; }
    }
}
