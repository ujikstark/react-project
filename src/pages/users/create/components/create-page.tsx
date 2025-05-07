import { request } from "@/common/helpers/request";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

import { useNavigate, useOutletContext } from "react-router-dom";
import UserDetails from "../../components/user-details";
import { User } from "@/common/interfaces/user";
import { UserRegisterForm } from "../../data/schema";
import { useUserUtilities } from "../../hooks/useUserUtilities";
import { CreateUserContext } from "../create";
import { useEffect } from "react";



export default function CreatePage() {

    // const [isFormBusy, setIsFormBusy] = useState(false);

    const navigate = useNavigate();
    const context: CreateUserContext = useOutletContext();
    const {
        user,
        errors
    } = context;

    const {
        handleChange,
    } = useUserUtilities();

    useEffect(() => {
        handleChange('name', '');
        handleChange('email', '');
        handleChange('password', '');
        handleChange('password_confirmation', '');

    }, [])

    const createUser = async (user: User) => {


        await request('POST', 'http://api.ujik.web:8000/api/users', user);


        // setIsFormBusy(false);
        navigate('/users')

        // showSubmittedData(values)
        // onOpenChange(false)
    }

    return (

        <UserDetails user={user} mode="create" handleChange={handleChange} errors={errors} onSaveClick={() => createUser(user)} />
    )
}