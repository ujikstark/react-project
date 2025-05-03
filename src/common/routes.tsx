import UserPage from "@/pages/users";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { PrivateRoute } from "@/components/private-route";
import { Index } from "@/pages";
import { authenticationRoutes } from "@/pages/authentication/routes";
import Dashboard from "@/pages/dashboard/dashboard";
import { Route, Routes } from "react-router-dom";
import Roles from "@/pages/roles";

export const routes = (
    <Routes>
        <Route path="/" element={<Index />} />
        {authenticationRoutes}
        <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/roles" element={<Roles />} />

            </Route>
        </Route>
    </Routes >
)