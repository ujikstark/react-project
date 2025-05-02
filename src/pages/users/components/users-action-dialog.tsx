'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
// import { SelectDropdown } from '@/components/select-dropdown'
// import { userTypes } from '../data/data'
import { User } from '../data/schema'
import { request } from '@/common/helpers/request'

const formSchema = z
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
type UserForm = z.infer<typeof formSchema>

interface Props {
    currentRow?: User
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
    const is_edit = !!currentRow
    const form = useForm<UserForm>({
        resolver: zodResolver(formSchema),
        defaultValues: is_edit
            ? {
                ...currentRow,
                password: '',
                password_confirmation: '',
                is_edit,
            }
            : {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                is_edit,
            },
    })

    const onSubmit = async (values: UserForm) => {
        await request('POST', 'http://api.ujik.web:8000/api/users', { ...values });

        form.reset()
        showSubmittedData(values)
        onOpenChange(false)
    }

    const isPasswordTouched = !!form.formState.dirtyFields.password

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                form.reset()
                onOpenChange(state)
            }}
        >
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader className='text-left'>
                    <DialogTitle>{is_edit ? 'Edit User' : 'Add New User'}</DialogTitle>
                    <DialogDescription>
                        {is_edit ? 'Update the user here. ' : 'Create new user here. '}
                        Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
                    <Form {...form}>
                        <form
                            id='user-form'
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 p-0.5'
                        >

                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-right'>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Doe'
                                                className='col-span-4'
                                                autoComplete='off'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-right'>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='john.doe@gmail.com'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-right'>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder='e.g., S3cur3P@ssw0rd'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password_confirmation'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-right'>
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                disabled={!isPasswordTouched}
                                                placeholder='e.g., S3cur3P@ssw0rd'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button type='submit' form='user-form'>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
