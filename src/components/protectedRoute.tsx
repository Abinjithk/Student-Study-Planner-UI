// ProtectedRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
  isAdmin?: boolean;
}

const ProtectedRoute = ({ children, isAuthenticated, isAdmin }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    // User not logged in
    return <Navigate to="/login" replace />;
  }

  if (isAdmin !== undefined && !isAdmin) {
    // Admin route but user is not admin
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
