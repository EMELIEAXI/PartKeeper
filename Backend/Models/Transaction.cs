using System;

public class Transaction
{
    public int TransactionId { get; set; }

    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public string UserId { get; set; } = null!;
    public ApplicationUser User { get; set; } = null!;

    public int QuantityChange { get; set; }
    public int NewQuantity { get; set; }

    public string TransactionType { get; set; } = null!;

    public string? Comment { get; set; }

    public DateTime TimeStamp { get; set; } = DateTime.UtcNow;
}
