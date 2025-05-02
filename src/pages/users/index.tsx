import { request } from "@/common/helpers/request";
import { User, columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { useEffect, useState } from "react";
import { UsersDialogs } from "./components/users-dialogs";
import UsersProvider from "./contexts/users-context";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";


export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const usersResponse = await request('GET', 'http://api.ujik.web:8000/api/users');
            setUsers(usersResponse.data)
        } catch (error) {
            console.error('Failed to fetch users:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <UsersProvider>

            <div className="container mx-auto py-4">
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
                        <p className='text-muted-foreground'>
                            Manage your users and their roles here.
                        </p>
                    </div>
                    <UsersPrimaryButtons />
                </div>

                <DataTable columns={columns(fetchUsers)} data={users} />
                <UsersDialogs />

            </div>
        </UsersProvider>
    )
}
