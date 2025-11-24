import { createContext, useContext, useState, type ReactNode } from "react";

type UserRole = "admin" | "user";

type AuthContextType = {
  token: string | null;
  user: { email: string; role: UserRole } | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginDev: (role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<{ email: string; role: UserRole } | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem("token", data.token);

      setToken(data.token);
      setUser({ email, role: data.role || "user" });

      return true;
    } catch {
      return false;
    }
  };

  // Devmode - login * tillfällig *
  const loginDev = (role: UserRole) => {
    const fakeToken = "dev-token";

    localStorage.setItem("token", fakeToken);
    setToken(fakeToken);

    setUser({
      email: role === "admin" ? "admin@test.com" : "user@test.com",
      role
    });
  };


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, isAdmin, login, loginDev, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}