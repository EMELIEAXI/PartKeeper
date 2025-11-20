import type { JSX } from "react";
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to ="/login" replace />;

  return children;
}