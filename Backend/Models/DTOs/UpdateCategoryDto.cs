using System.ComponentModel.DataAnnotations;

namespace LagerWebb.Models.DTOs
{
    public class UpdateCategoryDto
    {
        [Required]
        public required string CategoryName { get; set; }
    }
}
