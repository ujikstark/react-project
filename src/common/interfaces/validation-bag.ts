export interface ValidationBag {
    message: string;
    errors: Record<string, string[]>;
}

export interface GenericValidationBag<T> {
    message: string;
    errors?: T;
}