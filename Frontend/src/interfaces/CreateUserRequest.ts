export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "admin" | "user";
}