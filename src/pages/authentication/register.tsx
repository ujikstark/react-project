import { useFormik } from 'formik';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router";
import { request } from "@/common/helpers/request"
import { RegisterForm } from '@/common/dtos/authentication';
import { useState } from 'react';
import { RegisterValidation } from './common/validation-interface';
import { AxiosError } from 'axios';
import { GenericValidationBag } from '@/common/interfaces/validation-bag';

export function Register({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [errors, setErrors] = useState<RegisterValidation | undefined>(
        undefined
    );
    const [isFormBusy, setIsFormBusy] = useState(false);
    const [message, setMessage] = useState('');

    const form = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        onSubmit: async (values: RegisterForm) => {

            setMessage('');
            setErrors(undefined);
            setIsFormBusy(true);


            if (values.password !== values.password_confirmation) {
                setIsFormBusy(false);

                setErrors({
                    password_confirmation: ['Password confirmation does not match.'],
                });


                return;
            }

            await request('GET', 'http://localhost:8000/sanctum/csrf-cookie').then((response) => { console.log(response) });


            request('POST', 'http://localhost:8000/register', { ...values })
                .then((response) => console.log(response))
                .catch(
                    (error: AxiosError<GenericValidationBag<RegisterValidation>>) => {
                        if (error.response?.status === 422) {
                            setErrors(error.response.data.errors);
                        }

                        setMessage(error.response?.data.message as string);
                        setIsFormBusy(false);
                    }
                )


        },
    });


    function register(form: HTMLFormElement) {
        const formData = new FormData(form);

        // console.log(formData.get('email'))
        request('GET', 'http://localhost:8000/sanctum/csrf-cookie').then((response) => { console.log(response) });
        request('POST', 'http://localhost:8000/register', Object.fromEntries(formData)).then((response) => console.log(response));
    }


    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    {message ? <div style={{ color: 'var(--destructive)' }}>Error: {message}</div> : ''}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Register</CardTitle>
                            <CardDescription>
                                Create your account in seconds
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Budi"
                                            name="name"
                                            onChange={form.handleChange}
                                            value={form.values.name}
                                            required
                                        />
                                        {errors?.name ? <div style={{ color: 'var(--destructive)' }}> {errors.name}</div> : ''}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            name="email"
                                            onChange={form.handleChange}
                                            value={form.values.email}
                                            required
                                        />
                                        {errors?.email ? <div style={{ color: 'var(--destructive)' }}>{errors.email}</div> : ''}

                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>

                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            onChange={form.handleChange}
                                            value={form.values.password}
                                            required
                                        />
                                        {errors?.password ? <div style={{ color: 'var(--destructive)' }}>{errors.password}</div> : ''}


                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password_confirmation">Confirm your password</Label>

                                        </div>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            onChange={form.handleChange}
                                            value={form.values.password_confirmation}
                                            required
                                        />
                                        {errors?.password_confirmation ? <div style={{ color: 'var(--destructive)' }}>{errors.password_confirmation}</div> : ''}

                                    </div>
                                    <Button type="submit" className="w-full">
                                        Register
                                    </Button>

                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Already have an account?{" "}
                                    <Link to="/login" className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    )
}
