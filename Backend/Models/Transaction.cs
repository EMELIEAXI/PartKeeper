using System;
using System.ComponentModel.DataAnnotations;

public class Transaction
{
    public int TransactionId { get; set; }

    [Required(ErrorMessage = "ProduktId är obligatoriskt.")]
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;

    [Required(ErrorMessage = "UserId är obligatoriskt.")]
    public string UserId { get; set; } = null!;
    public ApplicationUser User { get; set; } = null!;

    [Range(-999999, 999999, ErrorMessage = "QuantityChange måste vara ett rimligt värde.")]
    public int QuantityChange { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "NewQuantity kan inte vara negativt.")]
    public int NewQuantity { get; set; }


    [Required(ErrorMessage = "TransactionType är obligatoriskt.")]
    [StringLength(20, ErrorMessage = "TransactionType får max vara 20 tecken.")]
    public string TransactionType { get; set; } = null!;

    [StringLength(500, ErrorMessage = "Kommentar får max vara 500 tecken.")]
    public string? Comment { get; set; }

    public DateTime TimeStamp { get; set; } = DateTime.UtcNow;
}
