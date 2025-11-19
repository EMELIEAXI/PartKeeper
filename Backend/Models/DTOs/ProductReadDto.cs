namespace LagerWebb.Models.DTOs
{
    public class ProductReadDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ArticleNumber { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
}
