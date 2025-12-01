using System.ComponentModel.DataAnnotations;

namespace LagerWebb.Models.DTOs
{
    public class CreateCategoryDto
    {
        [Required]
        public required string CategoryName { get; set; }
    }
}
