export interface IContactForm {
    email: string;
    name: string;
}

export interface ISignupForm extends IContactForm {
    password: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}