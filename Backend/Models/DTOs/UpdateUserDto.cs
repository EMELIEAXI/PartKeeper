namespace LagerWebb.Models.DTOs
{
    public class UpdateUserDto
    {
        public string? UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public List<string>? Roles { get; set; }
    }
}
