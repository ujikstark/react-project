import { z } from "zod"

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>