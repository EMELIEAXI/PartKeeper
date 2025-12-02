using LagerWebb.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PartsController : ControllerBase
{
    private readonly PartsService _service;

    public PartsController(PartsService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetParts(
         string? search,
        string? sort,
        int? categoryId,
        bool? inStock,
        string? name,
        string? articleNumber,
        int page = 1,
        int pageSize = 10)
    {
        // Om page eller pageSize är ogiltiga → returnera error
        if (page < 1 || pageSize < 1)
            return BadRequest(new { message = "page och pageSize måste vara större än 0." });

        // Om pagination/sök-sort är angivet → använd nya logiken
        if (!string.IsNullOrWhiteSpace(search) || !string.IsNullOrWhiteSpace(sort) || page > 1 || pageSize != 10)
        {
            var pagedResult = await _service.GetFilteredPagedPartsAsync(search, sort, categoryId, inStock, name, articleNumber, page, pageSize);
            return Ok(pagedResult);
        }

        // Fallback → returnera ALLT (som tidigare)
        var parts = await _service.GetAllPartsAsync();

        var result = parts.Select(p => new ProductReadDto
        {
            Id = p.ProductId,
            ProductName = p.ProductName,
            ArticleNumber = p.ArticleNumber,
            Quantity = p.Quantity,
            Description = p.Description,
            CategoryId = p.CategoryId,
            Location = p.Location,
            MinimumStock = p.MinimumStock
        });

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var part = await _service.GetPartByIdAsync(id);

        if (part == null)
            return NotFound(new { message = $"Produkten med id {id} hittades inte." });

        var dto = new ProductReadDto
        {
            Id = part.ProductId,
            ProductName = part.ProductName,
            ArticleNumber = part.ArticleNumber,
            Quantity = part.Quantity,
            CategoryId = part.CategoryId,
            MinimumStock = part.MinimumStock,
            Location = part.Location,
            Description = part.Description
        };

        return Ok(dto);
    }

    [HttpGet("lowstock")]
    public async Task<IActionResult> GetLowStock(
    string? search = null,
    string sort = "asc")
    {
        var parts = await _service.GetLowStockAsync(search, sort);

        var result = parts.Select(p => new ProductReadDto
        {
            Id = p.ProductId,
            ProductName = p.ProductName,
            ArticleNumber = p.ArticleNumber,
            Quantity = p.Quantity,
            MinimumStock = p.MinimumStock,
            CategoryId = p.CategoryId,
            Location = p.Location,
            Description = p.Description
        });

        return Ok(result);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreatePart(ProductCreateDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return BadRequest(new { errors });
        }

        var created = await _service.CreatePartAsync(dto);

        var readDto = new ProductReadDto
        {
            Id = created.ProductId,
            ProductName = created.ProductName,
            ArticleNumber = created.ArticleNumber,
            Quantity = created.Quantity,
            CategoryId = created.CategoryId,
            Location = created.Location,
            MinimumStock = created.MinimumStock,
            Description = created.Description
        };

        return CreatedAtAction(nameof(GetById), new { id = created.ProductId }, readDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/increase")]
    public async Task<IActionResult> Increase(int id)
    {
        var success = await _service.IncreaseStockAsync(id);
        if (!success)
            return NotFound(new { message = $"Produkten med id {id} hittades inte eller kunde inte ökas." });


        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ProductUpdateDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return BadRequest(new { errors });
        }

        var updated = await _service.UpdatePartAsync(id, dto);

        if (updated == null) return NotFound(new { message = $"Produkten med id {id} hittades inte." });

        return NoContent();
    }

    [HttpPut("{id}/decrease")]
    public async Task<IActionResult> Decrease(int id)
    {
        var success = await _service.DecreaseStockAsync(id);
        if (!success)
            return BadRequest(new { message = "Saldo kan inte bli negativt eller produkten finns inte." });

        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.GetPartByIdAsync(id);
        if (success == null)
            return NotFound(new { message = $"Produkten med id {id} hittades inte." });


        await _service.DeletePartAsync(id);

        return NoContent();
    }
}