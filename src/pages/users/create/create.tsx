import { DashboardLayout, Page } from "@/components/layouts/dashboard-layout";
import { useAtom } from "jotai";
import { Outlet, useParams } from "react-router-dom";
import { userAtom } from "../common/atom";
import { User } from "@/common/interfaces/user";
import { ValidationBag } from "@/common/interfaces/validation-bag";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHandleCreate } from "../hooks/useHandleCreate";

export type ChangeHandler = <T extends keyof User>(
    property: T,
    value: User[typeof property]
) => void;

export interface CreateUserContext {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
    errors: ValidationBag | undefined;
}


export default function Create() {


    const pages: Page[] = [
        { name: 'users', href: '/users' },
        { name: 'New User', href: '/users/create' },
    ];

    const [user, setUser] = useAtom(userAtom);
    const [errors, setErrors] = useState<ValidationBag>();

    const save = useHandleCreate({ setErrors });

    return (
        <>
            <DashboardLayout breadcrumbs={pages}>
                <Outlet
                    context={{
                        user,
                        setUser,
                        errors
                    }}
                />
            </DashboardLayout>
        </>
    )

}