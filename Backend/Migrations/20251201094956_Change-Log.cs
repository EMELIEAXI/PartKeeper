using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LagerWebb.Migrations
{
    /// <inheritdoc />
    public partial class ChangeLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "IsAdmin",
            //    table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "ChangeLogs",
                columns: table => new
                {
                    ChangeLogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HttpMethod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Endpoint = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangeLogs", x => x.ChangeLogId);
                });
        }

        /// <inheritdoc />
        //protected override void Down(MigrationBuilder migrationBuilder)
        //{
        //    migrationBuilder.DropTable(
        //        name: "ChangeLogs");

        //    migrationBuilder.AddColumn<bool>(
        //        name: "IsAdmin",
        //        table: "AspNetUsers",
        //        type: "bit",
        //        nullable: false,
        //        defaultValue: false);
        //}
    }
}
