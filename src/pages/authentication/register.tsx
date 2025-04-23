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
export function Register({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {


    function register(form: HTMLFormElement) {
        const formData = new FormData(form);

        // console.log(formData.get('email'))

        request('POST', 'http://localhost:8000/register', Object.fromEntries(formData)).then((response) => console.log(response));
    }


    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Register</CardTitle>
                            <CardDescription>
                                Create your account in seconds
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                register(e.currentTarget)
                            }}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Budi"
                                            name="name"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            name="email"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>

                                        </div>
                                        <Input id="password" type="password" name="password" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password_confirmation">Confirm your password</Label>

                                        </div>
                                        <Input id="password_confirmation" type="password" name="password_confirmation" required />
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
        </div>
    )
}
