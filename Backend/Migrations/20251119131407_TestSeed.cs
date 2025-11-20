using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LagerWebb.Migrations
{
    /// <inheritdoc />
    public partial class TestSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 3);

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "ArticleNumber", "CategoryId", "CreatedAt", "Description", "Location", "MinimumStock", "ProductName", "Quantity" },
                values: new object[] { 99, "TEST", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, 0, "TEST", 0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 99);

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "ArticleNumber", "CategoryId", "CreatedAt", "Description", "Location", "MinimumStock", "ProductName", "Quantity" },
                values: new object[,]
                {
                    { 1, "19446", 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Stållina för diverse användning", "A1", 10, "Stållina", 100 },
                    { 2, "45237", 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ledare för lina", "B2", 5, "Linledare", 50 },
                    { 3, "124639", 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Förpackning med knappar", "B3", 20, "Knappar", 200 }
                });
        }
    }
}
