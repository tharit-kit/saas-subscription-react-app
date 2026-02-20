export interface Country {
    name: string;
    code: string;
}

export interface RegisterForm {
    companyName: string;
    businessTypeId: string;

    address1: string;
    address2: string;
    country: string;
    district: string;
    subdistrict: string;
    province: string;
    zipcode: string;

    displayName: string;
    email: string;
    password: string;
    confirmedPassword: string;
}

export interface PasswordRule {
    id: string;
    label: string;
    test: (password: string) => boolean;
};