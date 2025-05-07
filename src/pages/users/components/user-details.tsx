import { User } from "@/common/interfaces/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ValidationBag } from "@/common/interfaces/validation-bag";
import { Card } from "@/components/ui/card";
import { ChangeHandler } from "../create/create";

type FormMode = 'create' | 'edit' | 'change-password';

interface Props {
    mode: FormMode;
    user?: User;
    handleChange: ChangeHandler;
    errors: ValidationBag | undefined;
    onSaveClick?: any,
}


export default function UserDetails(props: Props) {
    const { user, handleChange, errors, mode } = props;

    const showUserInfo = mode === 'create' || mode === 'edit';
    const showPasswordFields = mode === 'create' || mode === 'change-password';

    return (
        <form id="user-form" className="space-y-4 p-0.5">
            {showUserInfo && (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Joe"
                            value={user?.name ?? ''}
                            onChange={(e) => {
                                handleChange('name', e.target.value)
                            }}
                            required={mode === 'create'}
                        />
                        {errors?.errors.name && <p className="text-red-500 text-sm">{errors.errors.name}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            value={user?.email ?? ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            required={mode === 'create'}
                            disabled={mode === 'edit'} // Disable editing email on update
                        />
                        {errors?.errors.email && <p className="text-red-500 text-sm">{errors.errors.email}</p>}
                    </div>
                </>
            )}

            {showPasswordFields && (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                            value={user?.password ?? ''}
                            onChange={(e) => handleChange('password', e.target.value)}
                            required={mode === 'create' || mode === 'change-password'}
                        />
                        {errors?.errors.password && <p className="text-red-500 text-sm">{errors.errors.password}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            placeholder="********"
                            value={user?.password_confirmation ?? ''}
                            onChange={(e) => handleChange('password_confirmation', e.target.value)}
                            required={mode === 'create' || mode === 'change-password'}
                        />
                        {errors?.errors.password_confirmation && (
                            <p className="text-red-500 text-sm">{errors.errors.assword_confirmation}</p>
                        )}
                    </div>
                </>
            )}

            <Button type="submit" form="user-form" onClick={props.onSaveClick}
            >
                Save changes
            </Button>
        </form>
    );
}
