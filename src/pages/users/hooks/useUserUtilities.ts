import { useAtom } from "jotai";
import { userAtom } from "../common/atom";
import { ChangeHandler } from "../create/create";

export function useUserUtilities() {
    const [user, setUser] = useAtom(userAtom);

    const handleChange: ChangeHandler = (property, value) => {
        setUser((current) => ({
            ...(current ?? {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }),
            [property]: value,
        }));
    };


    return { handleChange };
} 