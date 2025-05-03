"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Role } from "../data/schema"
import { RoleActions } from "./role-actions"



export const columns = (fetchRoles: () => void): ColumnDef<Role>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "permissions",
        header: "Permissions",
        cell: ({ row }) => {
            const role = row.original;

            const permissions = role.permissions.map(element => {
                return element.name
            });

            return <span>{permissions.toString()}</span>

        }
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const role = row.original
            return <RoleActions role={role} fetchRoles={fetchRoles} />
        },
    },
]