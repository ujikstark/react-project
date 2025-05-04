import { request } from "@/common/helpers/request";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { z } from "zod";
import { User, UserForm, formSchema } from "../data/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


interface Props {
    currentRow?: User
}

export default function Create({ currentRow }: Props) {

    const [isFormBusy, setIsFormBusy] = useState(false);
    const navigate = useNavigate();
    const pages = [
        { name: 'Users', href: '/users' },
        { name: 'New User', href: '/users/create' }
    ];

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

        setIsFormBusy(true);
        if (values.is_edit) await request('PUT', `http://api.ujik.web:8000/api/users/${currentRow?.id}`, { ...values });

        else await request('POST', 'http://api.ujik.web:8000/api/users', { ...values });



        form.reset()
        setIsFormBusy(false);
        navigate('/users')

        // showSubmittedData(values)
        // onOpenChange(false)
    }

    const isPasswordTouched = !!form.formState.dirtyFields.password


    return (
        <DashboardLayout breadcrumbs={pages}>

            <div className='px-4'>
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
                        <Button disabled={isFormBusy} type='submit' form='user-form'>
                            Save changes
                        </Button>
                    </form>
                </Form>
            </div>
        </DashboardLayout>
    )
}