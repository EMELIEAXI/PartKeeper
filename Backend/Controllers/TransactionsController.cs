using LagerWebb.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TransactionsController : ControllerBase
{
    private readonly TransactionService _service;

    public TransactionsController(TransactionService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTransaction([FromBody] TransactionCreateDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return BadRequest(new { errors });
        }

        try
        {
            var transaction = await _service.CreateTransactionAsync(dto);

            var response = new TransactionReadDto
            {
                TransactionId = transaction.TransactionId,
                ProductId = transaction.ProductId,
                ProductName = transaction.Product!.ProductName,
                QuantityChange = transaction.QuantityChange,
                NewQuantity = transaction.NewQuantity,
                TransactionType = transaction.TransactionType,
                Comment = transaction.Comment,
                User = transaction.User != null
                    ? transaction.User.FirstName + " " + transaction.User.LastName
                    : "Okänd användare",
                TimeStamp = transaction.TimeStamp
            };


            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetTransations()
    {
        var transactions = await _service.GetTransactionsAsync();
        return Ok(transactions);
    }
}