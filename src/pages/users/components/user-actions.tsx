import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { User } from "./columns"
import { toast } from "sonner"
import { request } from "@/common/helpers/request"
import { useNavigate } from "react-router-dom"
import { useUsers } from "../contexts/users-context"

interface UserActionsProps {
    user: User,
    fetchUsers: () => void;
}

export function UserActions({ user, fetchUsers }: UserActionsProps) {
    // const [open, setOpen] = useState(false);
    const { setOpen, setCurrentRow } = useUsers()

    const navigate = useNavigate();


    const deleteUser = async (id) => {
        try {
            const res = await request('DELETE', 'http://api.ujik.web:8000/api/users/' + id);

            if (res.status === 204) {

                toast.success('User deleted successfully.', { style: { backgroundColor: 'var(--success)' } });

            } else {
                toast.error('Failed to delete user.', { style: { backgroundColor: 'var(--destructive)' } });
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong.', { style: { backgroundColor: 'var(--destructive)' } });

        } finally {
            // setOpen(false)
            fetchUsers();
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(`/users/${user.id}`)}>Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        setOpen('edit');
                        setCurrentRow(user)

                    }}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        setCurrentRow(user)
                        setOpen('delete') 
                    }}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete user "{user.name}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                deleteUser(user.id);
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </>
    )
}
