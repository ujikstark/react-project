import { request } from "@/common/helpers/request";
import { User, columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";


export default function DemoPage() {
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
        <div className="container mx-auto py-10">
            <DataTable columns={columns(fetchUsers)} data={users} />
        </div>
    )
}
