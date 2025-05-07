import { request } from "@/common/helpers/request";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

import { useNavigate, useOutletContext } from "react-router-dom";
import UserDetails from "../../components/user-details";
import { User } from "@/common/interfaces/user";
import { UserRegisterForm } from "../../data/schema";
import { useUserUtilities } from "../../hooks/useUserUtilities";
import { CreateUserContext } from "../create";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ValidationBag } from "@/common/interfaces/validation-bag";
import { AxiosError } from "axios";
import { useHandleCreate } from "../../hooks/useHandleCreate";



export default function CreatePage() {

    // const [isFormBusy, setIsFormBusy] = useState(false);

    const navigate = useNavigate();
    const context: CreateUserContext = useOutletContext();
    const {
        user,
        // errors
    } = context;

    const {
        handleChange,
    } = useUserUtilities();

    const [errors, setErrors] = useState<ValidationBag>();


    const createUser = useHandleCreate({ setErrors });


    useEffect(() => {
        handleChange('name', '');
        handleChange('email', '');
        handleChange('password', '');
        handleChange('password_confirmation', '');

    }, [])


    return (

        <UserDetails user={user} mode="create" handleChange={handleChange} errors={errors} onSaveClick={() => createUser(user as User)} />
    )
}