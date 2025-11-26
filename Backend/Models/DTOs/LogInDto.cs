using System.ComponentModel.DataAnnotations;

namespace LagerWebb.Models.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Användarnamn krävs.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Lösenord krävs.")]
        public required string Password { get; set; }
    }
}
