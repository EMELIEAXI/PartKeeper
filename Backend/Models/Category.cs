using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Category
{
    public int CategoryId { get; set; }

    [Required(ErrorMessage = "Kategori-namn är obligatoriskt.")]
    [StringLength(50, ErrorMessage = "Kategori-namnet får max vara 50 tecken.")]
    public string CategoryName { get; set; } = null!;

    [JsonIgnore]
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
