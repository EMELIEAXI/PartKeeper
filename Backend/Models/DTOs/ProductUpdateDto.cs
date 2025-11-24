using System.ComponentModel.DataAnnotations;

namespace LagerWebb.Models.DTOs
{
    public class ProductUpdateDto
    {
        [Required(ErrorMessage = "Produktnamn är obligatoriskt.")]
        [StringLength(100, ErrorMessage = "Produktnamn får max innehålla 100 tecken.")]
        public string ProductName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Artikelnummer är obligatoriskt.")]
        [StringLength(50, ErrorMessage = "Artikelnummer får max innehålla 50 tecken.")]
        public string ArticleNumber { get; set; } = string.Empty;

        [Range(0, int.MaxValue, ErrorMessage = "Quantity får inte vara negativ.")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "CategoryId är obligatoriskt.")]
        [Range(1, int.MaxValue, ErrorMessage = "CategoryId måste vara ett positivt tal.")]
        public int CategoryId { get; set; }

        [StringLength(50, ErrorMessage = "Location får max innehålla 50 tecken.")]
        public string? Location { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "MinimumStock får inte vara negativ.")]
        public int MinimumStock { get; set; }

        [StringLength(500, ErrorMessage = "Description får max innehålla 500 tecken.")]
        public string? Description { get; set; }
    }
}
