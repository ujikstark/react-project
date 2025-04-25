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
import { useState } from "react"
import { request } from "@/common/helpers/request"
import { useAuth } from "@/contexts/auth-context"
import { AxiosError } from "axios"
import { GenericValidationBag } from "@/common/interfaces/validation-bag"
import { LoginValidation } from "./common/validation-interface"
import { toast } from "sonner"

export function Login({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<LoginValidation | undefined>(undefined);
  const [isFormBusy, setIsFormBusy] = useState(false);

  const { setUser } = useAuth();

  async function handleSubmit(form: HTMLFormElement) {

    const formData = new FormData(form);

    setMessage(undefined);
    setErrors(undefined);
    setIsFormBusy(true);

    try {
      await request('POST', 'http://api.ujik.web:8000/login', Object.fromEntries(formData));
      // Fetch user data
      const userResponse = await request('GET', 'http://api.ujik.web:8000/api/user');
      toast.success('Login success', { style: { backgroundColor: 'green' } });
      setUser(userResponse.data);

    } catch (error) {
      setMessage(error.response?.data.message ?? 'Invalid credentials');
      setIsFormBusy(false);
    }




  }



  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          {message ? <div style={{ color: 'var(--destructive)' }}>Error: {message}</div> : ''}

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e.currentTarget)
                }}
              >
                <div className="flex flex-col gap-6">
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
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" name="password" required />
                  </div>
                  <Button disabled={isFormBusy} type="submit" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
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
