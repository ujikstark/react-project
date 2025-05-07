import { request } from "@/common/helpers/request";
import { User } from "@/common/interfaces/user";
import { ValidationBag } from "@/common/interfaces/validation-bag";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Params {
    setErrors: Dispatch<SetStateAction<ValidationBag | undefined>>;
}

export function useHandleCreate(params: Params) {

    const navigate = useNavigate();

    const { setErrors } = params;

    return (user: User) => {

        request('POST', 'http://api.ujik.web:8000/api/users', user).then(() => {
            toast.success('Success!')

            navigate('/users')
        }).catch((error: AxiosError<ValidationBag>) => {
            if (error.response?.status === 422) {
                const errorMessages = error.response.data;

                setErrors(errorMessages);
            } else {
                toast.warning('Error!')
            }
        }

        );
    }

}