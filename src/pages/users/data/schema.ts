import { z } from "zod"

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const formSchema = z
    .object({
        name: z.string().min(1, { message: 'First Name is required.' }),
        email: z
            .string()
            .min(1, { message: 'Email is required.' })
            .email({ message: 'Email is invalid.' }),
        password: z.string().transform((pwd) => pwd.trim()),
        password_confirmation: z.string().transform((pwd) => pwd.trim()),
        is_edit: z.boolean(),
    })
    .superRefine(({ is_edit, password, password_confirmation }, ctx) => {
        if (!is_edit || (is_edit && password !== '')) {
            if (password === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Password is required.',
                    path: ['password'],
                })
            }

            if (password.length < 8) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Password must be at least 8 characters long.',
                    path: ['password'],
                })
            }

            if (!password.match(/[a-z]/)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Password must contain at least one lowercase letter.',
                    path: ['password'],
                })
            }

            if (!password.match(/\d/)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Password must contain at least one number.',
                    path: ['password'],
                })
            }

            if (password !== password_confirmation) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Passwords don't match.",
                    path: ['password_confirmation'],
                })
            }
        }
    })
export type UserForm = z.infer<typeof formSchema>
