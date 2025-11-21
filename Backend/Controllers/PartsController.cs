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
    public async Task<IActionResult> GetParts()
    {
        var parts = await _service.GetAllPartsAsync();
       

        var result = parts.Select(p => new ProductReadDto
        {
            Id = p.ProductId,
            ProductName = p.ProductName,
            ArticleNumber = p.ArticleNumber,
            Quantity = p.Quantity,
            Description = p.Description
        });

        return Ok(result);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search(string query)
    {
        var parts = await _service.SearchPartsAsync(query);

        var result = parts.Select(p => new ProductReadDto
        {
            Id = p.ProductId,
            ProductName = p.ProductName,
            ArticleNumber = p.ArticleNumber,
            Quantity = p.Quantity
            Description = p.Description
        });

        return Ok(parts);
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
            Quantity = part.Quantity
        };

        return Ok(dto);
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