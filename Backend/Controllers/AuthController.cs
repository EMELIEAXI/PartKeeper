using LagerWebb.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IConfiguration config)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (dto == null)
            return BadRequest(new { message = "Request body saknas." });

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Bättre än FindByNameAsync
        var user = await _userManager.FindByEmailAsync(dto.Email);

        if (user == null)
            return Unauthorized(new { message = "Fel e-post eller lösenord." });

        if (!await _userManager.CheckPasswordAsync(user, dto.Password))
            return Unauthorized(new { message = "Fel e-post eller lösenord." });
       

        var roles = await _userManager.GetRolesAsync(user);

        var token = GenerateJwtToken(user, roles);

        return Ok(new
        {
            token,
            user = new
            {
                id = user.Id,
                email = user.Email,
                userName = user.UserName,
                firstName = user.FirstName,
                lastName = user.LastName,
                phoneNumber = user.PhoneNumber,
                roles = roles
            }
        });
    }

    private string GenerateJwtToken(ApplicationUser user, IList<string> roles)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName)
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"])
        );

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(12),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    [Authorize(Roles = "Admin")]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = new ApplicationUser
        {
            UserName = dto.Email,
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            // Password = dto.Password,
            PhoneNumber = dto.PhoneNumber
        };


        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });

        // Standardroll kan du ändra här
        await _userManager.AddToRoleAsync(user, dto.Role);

        return Ok(new { message = "Användare skapad." });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto dto)
    {

        if (dto == null)
            return BadRequest(new { message = "Request body saknas." });

        var user = await _userManager.FindByIdAsync(id);

        if (user == null)
            return NotFound(new { message = "Användare hittades inte." });

        bool changed = false;

        if (!string.IsNullOrEmpty(dto.UserName) && dto.UserName != user.UserName)
        {
            user.UserName = dto.UserName;
            changed = true;
        }

        if (!string.IsNullOrEmpty(dto.PhoneNumber))
        {
            user.PhoneNumber = dto.PhoneNumber;
            changed = true;
        }

        if (!string.IsNullOrEmpty(dto.FirstName))
        {
            user.FirstName = dto.FirstName;
            changed = true;
        }

        if (!string.IsNullOrEmpty(dto.LastName))
        {
            user.LastName = dto.LastName;
            changed = true;
        }
        if (!string.IsNullOrEmpty(dto.Role))
        {
            var currentRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, currentRoles);
            await _userManager.AddToRoleAsync(user, dto.Role);
        }
        if (changed)
        {
            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
                return BadRequest(new { errors = updateResult.Errors.Select(e => e.Description) });
        }


        return Ok(new { message = "Användare uppdaterad." });
    }
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAllUsers(string? search, string? role)
    {
        var query = _userManager.Users.AsQueryable();

        // --------- Fritextsökning ----------
        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();

            query = query.Where(u =>
                (u.Email != null && u.Email.ToLower().Contains(search)) ||
                (u.UserName != null && u.UserName.ToLower().Contains(search)) ||
                (u.FirstName != null && u.FirstName.ToLower().Contains(search)) ||
                (u.LastName != null && u.LastName.ToLower().Contains(search)) ||
                (u.PhoneNumber != null && u.PhoneNumber.ToLower().Contains(search))
            );
        }

        var allUsers = await query.ToListAsync();

        var filteredUsers = new List<ApplicationUser>();

        // --------- Filtrera på roll ----------
        if (!string.IsNullOrWhiteSpace(role))
        {
            foreach (var user in allUsers)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (roles.Any(r => string.Equals(r, role, StringComparison.OrdinalIgnoreCase)))
                {
                    filteredUsers.Add(user);
                }
            }
        }
        else
        {
            filteredUsers = allUsers;
        }

        // --------- Bygg DTO-listan ----------
        var userList = new List<UserDto>();

        foreach (var user in filteredUsers)
        {
            var roles = await _userManager.GetRolesAsync(user);

            userList.Add(new UserDto
            {
                Id = user.Id,
                Email = user.Email ?? "",
                UserName = user.UserName ?? "",
                FirstName = user.FirstName ?? "",
                LastName = user.LastName ?? "",
                PhoneNumber = user.PhoneNumber ?? "",
                Role = roles.FirstOrDefault() ?? "User"
            });
        }

        return Ok(userList);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();

        var result = await _userManager.DeleteAsync(user);
        if (!result.Succeeded) return BadRequest(new { errors = result.Errors.Select(e => e.Description) });

        return Ok();
    }
}