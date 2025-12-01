
using LagerWebb.Models;
using Microsoft.AspNetCore.Mvc.Filters;
    using System.Security.Claims;

namespace LagerWebb.Filters
{
    public class ChangeLogFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Vi kör action först
            var executedContext = await next();

            // Om det blev fel -> logga inte
            if (executedContext.Exception != null) return;

            var httpMethod = context.HttpContext.Request.Method;

            // Logga bara ändringar
            if (httpMethod != "POST" && httpMethod != "PUT" && httpMethod != "DELETE")
                return;

            var user = context.HttpContext.User;
            var userName = user?.FindFirst(ClaimTypes.Name)?.Value ?? "Okänd användare";

            var endpoint = context.HttpContext.Request.Path;

            // Spara loggen i databasen via DI
            var db = context.HttpContext.RequestServices.GetRequiredService<ApplicationDbContext>();

            db.ChangeLogs.Add(new ChangeLog
            {
                UserName = userName,
                HttpMethod = httpMethod,
                Endpoint = endpoint,
                TimeStamp = DateTime.Now
            });

            await db.SaveChangesAsync();
        }
    }
}
