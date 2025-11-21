using System;
using System.ComponentModel.DataAnnotations;

public class Product
{
    public int ProductId { get; set; }

    [Required(ErrorMessage = "Artikelnummer är obligatoriskt.")]
    [StringLength(50, ErrorMessage = "Artikelnummer får max vara 50 tecken.")]
    public string ArticleNumber { get; set; } = null!;

    [Required(ErrorMessage = "Produktnamn är obligatoriskt.")]
    [StringLength(100, ErrorMessage = "Produktnamnet får max vara 100 tecken.")]
    public string ProductName { get; set; } = null!;

    [StringLength(500, ErrorMessage = "Beskrivningen får max vara 500 tecken.")]
    public string? Description { get; set; }

    [Required(ErrorMessage = "Kategori är obligatoriskt.")]
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    [Range(0, int.MaxValue, ErrorMessage = "Antal kan inte vara negativt.")]
    public int Quantity { get; set; }

    [StringLength(50, ErrorMessage = "Plats får max vara 50 tecken.")]
    public string? Location { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Minimilager kan inte vara negativt.")]
    public int MinimumStock { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
