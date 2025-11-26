using System.ComponentModel.DataAnnotations;

public class TransactionCreateDto
{
    [Required]
    public int ProductId { get; set; }

    [Required]
    public int QuantityChange { get; set; }

    [Required]
    public string TransactionType { get; set; } = null!;

    public string? Comment { get; set; }
}

