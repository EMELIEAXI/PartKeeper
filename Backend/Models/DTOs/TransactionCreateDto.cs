using System.ComponentModel.DataAnnotations;

namespace LagerWebb.Models.DTOs
{
    public class TransactionCreateDto
    {
        [Required(ErrorMessage = "ProductId är obligatoriskt.")]
        [Range(1, int.MaxValue, ErrorMessage = "ProductId måste vara ett positivt tal.")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "QuantityChange är obligatoriskt.")]
        [Range(-100000, 100000, ErrorMessage = "QuantityChange måste vara ett rimligt värde.")]
        public int QuantityChange { get; set; }

        [Required(ErrorMessage = "TransactionType är obligatoriskt.")]
        [RegularExpression("^(Add|Remove)$", ErrorMessage = "TransactionType måste vara 'Add' eller 'Remove'.")]
        public string TransactionType { get; set; } = null!;

        [StringLength(500, ErrorMessage = "Kommentar får max innehålla 500 tecken.")]
        public string? Comment { get; set; }
    }
}
