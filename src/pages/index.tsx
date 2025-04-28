import { useAuth } from "@/contexts/auth-context";
import { Navigate } from "react-router-dom";

export function Index() {
    const { user } = useAuth();

    return user ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    );
}