import { route } from "@/common/helpers/route";
import { DashboardLayout, Page } from "@/components/layouts/dashboard-layout";
import { useAtom } from "jotai";
import { Outlet, useParams } from "react-router-dom";
import { userAtom } from "./common/atom";
import { useEffect } from "react";
import { request } from "@/common/helpers/request";

export default function User() {

    const { id } = useParams();

    const pages: Page[] = [
        { name: 'users', href: '/users' },
        { name: 'Edit User', href: route('/users/:id/edit', { id }) },
    ];


    const [user, setUser] = useAtom(userAtom);


    const fetchUser = async () => {
        const userResponse = await request('GET', 'http://api.ujik.web:8000/api/users/' + id);
        console.log(userResponse.data)
        setUser(userResponse.data);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <DashboardLayout breadcrumbs={pages}>

                {user?.id == id ? (
                    <Outlet
                        context={{
                            user,
                            setUser
                        }}
                    />) : <h1>Loading...</h1>}
            </DashboardLayout>
        </>
    )

}