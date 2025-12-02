using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LagerWebb.Models.DTOs;
using System;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CategoriesController : ControllerBase
{
	private readonly ApplicationDbContext _context;

	public CategoriesController(ApplicationDbContext context)
	{
		_context = context;
	}

	[HttpGet]
	public async Task<IActionResult> GetCategories()
	{
		var categories = await _context.Categories.ToListAsync();
		return Ok(categories);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetCategory(int id)
	{
		var category = await _context.Categories.FindAsync(id);

		if (category == null)
			return NotFound(new { message = $"Kategori med id {id} hittades inte." });

		return Ok(category);
	}

    [Authorize(Roles = "Admin")]
    [HttpPost]
	public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto dto)
	{
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
            });
        }

        var category = new Category
        {
            CategoryName = dto.CategoryName
        };

        _context.Categories.Add(category);
		await _context.SaveChangesAsync();

		return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, category);
	}

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
	public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDto dto)
	{
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
            });
        }

        var existing = await _context.Categories.FindAsync(id);
		if (existing == null)
			return NotFound(new { message = $"Kategori med id {id} hittades inte." });

		existing.CategoryName = dto.CategoryName;

		await _context.SaveChangesAsync();
		return NoContent();
	}

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
	public async Task<IActionResult> DeleteCategory(int id)
	{
		var category = await _context.Categories.FindAsync(id);

		if (category == null)
			return NotFound(new { message = $"Kategori med id {id} hittades inte." });

		_context.Categories.Remove(category);
		await _context.SaveChangesAsync();

		return NoContent();
	}
}
