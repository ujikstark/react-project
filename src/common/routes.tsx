import { PrivateRoute } from "@/components/private-route";
import { Index } from "@/pages";
import { authenticationRoutes } from "@/pages/authentication/routes";
import Dashboard from "@/pages/dashboard/dashboard";
import { Route, Routes } from "react-router-dom";
import { userRoutes } from "@/pages/users/routes";

export const routes = (
    <Routes>
        <Route path="/" element={<Index />} />
        {authenticationRoutes}
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {userRoutes}
        </Route>
    </Routes >
)