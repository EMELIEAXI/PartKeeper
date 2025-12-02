using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LagerWebb.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
    table: "Categories",
    columns: new[] { "CategoryId", "CategoryName" },
    values: new object[,]
    {
        { 1, "Abus" },
        { 2, "Gigasense" },
        { 3, "Dematek" }
    });

            migrationBuilder.InsertData(
    table: "Products",
    columns: new[] { "ProductId", "ProductName", "ArticleNumber", "CategoryId", "Quantity", "MinimumStock", "CreatedAt" },
    values: new object[,]
    {
        { 1, "Stållina", "19446", 1, 50, 10, DateTime.Now },
        { 2, "Linledare", "45237", 2, 5, 10, DateTime.Now },
        { 3, "Knappar", "124639", 3, 5, 4, DateTime.Now }
    });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
