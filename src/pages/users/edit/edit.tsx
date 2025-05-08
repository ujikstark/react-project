
import { User } from "@/common/interfaces/user";
import UserDetails from "../components/user-details";
import { useNavigate, useOutletContext } from "react-router-dom";
import { UserEditForm } from "../data/schema";
import { request } from "@/common/helpers/request";
import { Dispatch, SetStateAction } from "react";
import { ValidationBag } from "@/common/interfaces/validation-bag";
import { useUserUtilities } from "../hooks/useUserUtilities";
import { toast } from "sonner";
import { AxiosError } from "axios";


export interface Context {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
    errors: ValidationBag | undefined;
}

export default function Edit() {

    const navigate = useNavigate();
    const context: Context = useOutletContext();
    const {
        user,
        errors
    } = context;

    const {
        handleChange,
    } = useUserUtilities();

    const updateUser = async (user: User) => {

        request('PUT', `http://api.ujik.web:8000/api/users/${user?.id}`, user).then(() => {
            toast.success('Success!')
            navigate('/users')
        }).catch((error: AxiosError<ValidationBag>) => {
            if (error.response?.status === 422) {
                // const errorMessages = error.response.data;

                // setErrors(errorMessages);
            } else {
                toast.warning('Error!')
            }
        });


    }


    return (
        <div className='px-4'>
            <h1 className="pb-4">User: {user?.email}</h1>
            <UserDetails user={user} onSaveClick={() => updateUser(user)} mode="edit" handleChange={handleChange} errors={errors} />
        </div>
    )
}