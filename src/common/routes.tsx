import { Index } from "@/pages";
import { authenticationRoutes } from "@/pages/authentication/routes";
import { Route, Routes } from "react-router-dom";

export const routes = (
    <Routes>
        <Route path="/" element={<Index />} />
        {authenticationRoutes}
    </Routes>
)