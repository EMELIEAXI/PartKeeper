import type { CreateUserRequest } from "../../interfaces/CreateUserRequest";
import type { UpdateUserDto } from "../../interfaces/UpdateUserDto";
import type { User } from "../../context/AuthContext";

// export type User = {
//   id: string;
//   email: string;
//   roles: string[];
// };

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    roles: string[];
  };
};

// Logga in med email och lösenord
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch("https://localhost:7089/api/Auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Login error:", text);
    throw new Error("Felaktiga inloggningsuppgifter");
  }

  const data: LoginResponse = await res.json();

  // Spara token och user i localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

// Logga ut
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Hämta token
export function getToken(): string | null {
  return localStorage.getItem("token");
}

// Hämta nuvarande användare från localStorage
export function getCurrentUser(): User | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

//Registrera användare
export async function registerUser(newUser: CreateUserRequest): Promise<User> {
  const token = getToken();

  const res = await fetch("https://localhost:7089/api/Auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Register error:", text);
    throw new Error("Kunde inte registrera användare");
  }

  return await res.json();
}

// Dev-mode login (enbart frontend)
// export function loginDev(role: "admin" | "user") {
//   const devUser: User = {
//     id: "dev-user-id",
//     email: "dev@example.com",
//     roles: [role === "admin" ? "Admin" : "User"],
//   };
//   localStorage.setItem("token", "dev-token");
//   localStorage.setItem("user", JSON.stringify(devUser));
// }

export async function updateUser(id: string, data: UpdateUserDto): Promise<void> {
  const token = getToken();

  const res = await fetch(`https://localhost:7089/api/Auth/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Update user failed:", text);
    throw new Error("Kunde inte uppdatera användare");
  }
}

export async function fetchAllUsers(search?: string, role?: string) {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (role) params.append("role", role);

  const token = localStorage.getItem("token"); // <-- HÄMTA TOKEN

 const res = await fetch(`https://localhost:7089/api/Auth?${params.toString()}`, {
  method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,   // <-- SKICKA TOKEN
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) throw new Error("Failed to load users");

  return res.json();
}

export async function deleteUser(userId: string): Promise<void> {
  const token = localStorage.getItem("token");

  const res = await fetch(`https://localhost:7089/api/Auth/${userId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete user error:", text);
    throw new Error("Kunde inte ta bort användaren");
  }
}