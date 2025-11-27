    using Microsoft.AspNetCore.Identity;

    public static class SeedUsers
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager)
        {
            // ADMIN
            var adminEmail = "admin@test.se";
            if (await userManager.FindByEmailAsync(adminEmail) == null)
            {
            var admin = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                EmailConfirmed = true,
                FirstName = "Admin",
                LastName = "User",
                PhoneNumber = "00000000"
            };

            await userManager.CreateAsync(admin, "Admin123!");
                await userManager.AddToRoleAsync(admin, "Admin");
            }

            // USER
            var userEmail = "user@test.se";
            if (await userManager.FindByEmailAsync(userEmail) == null)
            {
            var user = new ApplicationUser
            {
                UserName = userEmail,
                Email = userEmail,
                EmailConfirmed = true,
                FirstName = "Test",
                LastName = "User",
                PhoneNumber = "11111111"
            };

            await userManager.CreateAsync(user, "User123!");
                await userManager.AddToRoleAsync(user, "User");
            }
        }
    }