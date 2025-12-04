using LagerWebb.Models;
using LagerWebb.Models.DTOs;
using Microsoft.EntityFrameworkCore;

public class CategoryService
{
    private readonly ApplicationDbContext _context;

    public CategoryService(ApplicationDbContext context)
    {
        _context = context;
    }

    // ==========================
    // GET ALL
    // ==========================
    public async Task<List<Category>> GetAllCategoriesAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    // ==========================
    // GET BY ID
    // ==========================
    public async Task<Category?> GetCategoryByIdAsync(int id)
    {
        return await _context.Categories.FindAsync(id);
    }

    // ==========================
    // CREATE
    // ==========================
    public async Task<Category> CreateCategoryAsync(CreateCategoryDto dto)
    {
        var category = new Category
        {
            CategoryName = dto.CategoryName
        };

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return category;
    }

    // ==========================
    // UPDATE
    // ==========================
    public async Task<Category?> UpdateCategoryAsync(int id, UpdateCategoryDto dto)
    {
        var existing = await _context.Categories.FindAsync(id);
        if (existing == null)
            return null;

        existing.CategoryName = dto.CategoryName;

        await _context.SaveChangesAsync();
        return existing;
    }

    // ==========================
    // DELETE
    // ==========================
    public async Task<bool> DeleteCategoryAsync(int id)
    {
        var cat = await _context.Categories.FindAsync(id);
        if (cat == null)
            return false;

        _context.Categories.Remove(cat);
        await _context.SaveChangesAsync();

        return true;
    }
}
