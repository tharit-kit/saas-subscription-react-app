export interface RegisterForm {
    companyName: string;
    businessType: string;
    subdomain: string;

    address1: string;
    address2: string;
    country: string;
    district: string;
    subdistrict: string;
    province: string;
    zipcode: string;

    fullName: string;
    email: string;
    password: string;
    confirmedPassword: string;
}