export interface RegisterValidation {
    name?: string[];
    email?: string[];
    password?: string[];
    password_confirmation?: string[];
}

export interface LoginValidation {
    email?: string[];
    password?: string[];
}