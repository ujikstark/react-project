import { Route } from "react-router-dom";
import Users from "./index/users";
import Create from "./create/create";


export const userRoutes = (
    <Route path="/users">
        <Route path="" element={<Users />} />
        <Route path="create" element={<Create />} />
    </Route>
)