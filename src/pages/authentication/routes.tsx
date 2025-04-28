import { PublicRoute } from "@/components/public-route";
import { Route } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./register";



export const authenticationRoutes = (
    <>
        <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
        
    </>
)