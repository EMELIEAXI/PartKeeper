using System.ComponentModel.DataAnnotations;

namespace LagerWebb.Models.DTOs
{
    public class UserDto
    {
        [Required]
        public required string Id { get; set; }
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string UserName { get; set; }
        [Required]
        public required string FirstName { get; set; }
        [Required]
        public required string LastName { get; set; }
        [Required]
        public required string PhoneNumber { get; set; }
        [Required]
        public required string Role { get; set; }
    }
}
