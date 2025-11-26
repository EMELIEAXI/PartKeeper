// import type { JSX } from "react";
// import { useAuth } from "../context/AuthContext"
// import { Navigate } from "react-router-dom"

// export default function ProtectedRoute({ children }: { children: JSX.Element }) {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) return <Navigate to ="/login" replace />;

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}