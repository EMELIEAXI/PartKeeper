using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
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
        return Ok(parts);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search(string query)
    {
        var parts = await _service.SearchPartsAsync(query);
        return Ok(parts);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePart(Product part)
    {
        var created = await _service.CreatePartAsync(part);
        return Ok(created);
    }

    [HttpPut("{id}/increase")]
    public async Task<IActionResult> Increase(int id)
    {
        var success = await _service.IncreaseStockAsync(id);
        if (!success) return NotFound();

        return Ok();
    }

    [HttpPut("{id}/decrease")]
    public async Task<IActionResult> Decrease(int id)
    {
        var success = await _service.DecreaseStockAsync(id);
        if (!success) return BadRequest("Saldo kan inte bli negativt eller delen finns inte");

        return Ok();
    }
}