using System;

public class Product
{
    public int ProductId { get; set; }
    public string ArticleNumber { get; set; } = null!;
    public string ProductName { get; set; } = null!;
    public string? Description { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public int Quantity { get; set; }
    public string? Location { get; set; }
    public int MinimumStock { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
