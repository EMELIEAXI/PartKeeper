using System.ComponentModel.DataAnnotations;

namespace LagerWebb.Models.DTOs
{
    public class ProductCreateDto
    {
        [Required]
        [StringLength(50)]
        public required string ProductName { get; set; }

        [Required]
        [StringLength(20)]
        public required string ArticleNumber { get; set; }

        [Range(0, 9999)]
        public int Quantity { get; set; }

        public int CategoryId { get; set; }

        public string? Location { get; set; }

        public int MinimumStock {  get; set; }

        public string? Description { get; set; }
    }
}