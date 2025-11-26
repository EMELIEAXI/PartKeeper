import { createContext, useContext, useState, type ReactNode } from "react";
import { login as logInRequest, logout as logoutRequest } from "../services/Authentication/auth.api"

type User = {
  id: string;
  email: string;
  roles: string[];
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
// type AuthContextType = {
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   login: (admin?: boolean) => void;
//   logout: () => void;
// };

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null"));


  const login = async (email: string, password: string) => {
    console.log("Försöker logga in med:", email, password);

    const data = await logInRequest(email, password);

   console.log("Resultat från API:", JSON.stringify(data, null, 2));

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
  };

     const logout = () => {
    logoutRequest();
    setUser(null);
  };
  const isAuthenticated = !!user;
  const isAdmin = user?.roles.includes("Admin") ?? false;
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}