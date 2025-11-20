namespace LagerWebb.Models.DTOs
{
    public class ProductUpdateDto
    {
        public string ProductName { get; set; } = string.Empty;
        public string ArticleNumber { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public int CategoryId { get; set; }

        public string? Location { get; set; }

        public int MinimumStock { get; set; }

        public string? Description { get; set; }
    }
}
