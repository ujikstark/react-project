import { useAuth } from "@/contexts/auth-context";
import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
    const { user } = useAuth();

    return user ? <Navigate to="/dashboard" /> : <Outlet />;
}