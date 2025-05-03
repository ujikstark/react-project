import { z } from "zod"

const permissionSchema = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

export const permissionListSchema = z.array(permissionSchema)

const roleSchema = z.object({
    id: z.number(),
    name: z.string(),
    permissions: permissionListSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})



export type Role = z.infer<typeof roleSchema>
