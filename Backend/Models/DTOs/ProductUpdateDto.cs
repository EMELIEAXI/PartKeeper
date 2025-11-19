namespace LagerWebb.Models.DTOs
{
    public class ProductUpdateDto
    {
        public string ProductName { get; set; } = string.Empty;
        public string ArticleNumber { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
}
