import DemoPage from "@/app/users/page";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { PrivateRoute } from "@/components/private-route";
import { Index } from "@/pages";
import { authenticationRoutes } from "@/pages/authentication/routes";
import Dashboard from "@/pages/dashboard/dashboard";
import { Route, Routes } from "react-router-dom";

export const routes = (
    <Routes>
        <Route path="/" element={<Index />} />
        {authenticationRoutes}
        <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<DemoPage />} />
            </Route>
        </Route>
    </Routes >
)