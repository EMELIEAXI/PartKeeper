using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

public class ApplicationUser : IdentityUser
{
    [Required(ErrorMessage = "Förnamn är obligatoriskt.")]
    [StringLength(50, ErrorMessage = "Förnamn får max vara 50 tecken.")]
    public string FirstName { get; set; } = null!;


    [Required(ErrorMessage = "Efternamn är obligatoriskt.")]
    [StringLength(50, ErrorMessage = "Efternamn får max vara 50 tecken.")]
    public string LastName { get; set; } = null!;

    [Required]
    public bool IsAdmin { get; set; }
}