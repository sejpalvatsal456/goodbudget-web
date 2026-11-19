import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { user, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Restoring your session...
      </div>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/login?callback=${encodeURIComponent(location.pathname + location.search)}`}
      replace
    />
  );
} 