export interface User {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "Admin" | "User";
}
