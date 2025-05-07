import { Route } from "react-router-dom";
import Users from "./index/users";
import Create from "./create/create";
import User from "./user";
import Edit from "./edit/edit";
import CreatePage from "./create/components/create-page";


export const userRoutes = (
    <Route path="/users">
        <Route path="" element={<Users />} />
        <Route path="create" element={<Create />} >
            <Route path="" element={<CreatePage />} />
        </Route>

        <Route path=":id" element={<User />}>
            <Route path="edit" element={<Edit />} />
        </Route>
    </Route>
)