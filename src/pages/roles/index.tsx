import { request } from "@/common/helpers/request";
import { User, columns } from "./components/columns"
import { DataTable } from "./components/data-table";
import { useEffect, useState } from "react";
import { RolesPrimaryButtons } from "./components/roles-primary-buttons";
import RolesProvider from "./contexts/roles-context";


export default function Roles() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRoles = async () => {
        try {
            const rolesResponse = await request('GET', 'http://api.ujik.web:8000/api/roles');
            console.log(rolesResponse.data);
            setRoles(rolesResponse.data)
        } catch (error) {
            console.error('Failed to fetch roles:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRoles()
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <RolesProvider>

            <div className="container mx-auto py-4">
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Role List</h2>
                        <p className='text-muted-foreground'>
                            Manage roles
                        </p>
                    </div>
                    <RolesPrimaryButtons />
                </div>

                <DataTable columns={columns(fetchRoles)} data={roles} />
                {/* <UsersDialogs /> */}

            </div>
        </RolesProvider>
    )
}
