using System.ComponentModel.DataAnnotations;

public class RegisterDto
{
    [Required(ErrorMessage = "Email är obligatoriskt.")]
    [EmailAddress(ErrorMessage = "Felaktig email.")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "Lösenord är obligatoriskt.")]
    [MinLength(6, ErrorMessage = "Lösenord måste vara minst 6 tecken.")]
    public required string Password { get; set; }

    [Required(ErrorMessage = "Förnamn krävs.")]
    public required string FirstName { get; set; }

    [Required(ErrorMessage = "Efternamn krävs.")]   
    public required string LastName { get; set; }
}