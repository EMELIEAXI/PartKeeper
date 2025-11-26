namespace LagerWebb.Models.DTOs
{
    public class TransactionHistoryDto
    {
        public int TransactionId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int QuantityChange { get; set; }
        public int NewQuantity { get; set; }
        public string TransactionType { get; set; } = string.Empty;
        public string? Comment { get; set; }
        public string User { get; set; } = string.Empty;
        public DateTime TimeStamp { get; set; }
    }
}
