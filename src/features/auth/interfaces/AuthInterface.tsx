export interface TenantRegistrationRequest {
    tenantInfo: TenantInfomation,
    tenantAddress: TenantAddress,
    newAdmin: NewAdmin
}

export interface TenantRegistrationResponse{
    tenantId: string,
    adminId: string
}

export interface EmailVerificationResponse{
    userId: string,
    tenantId: string
}

interface TenantInfomation {
    tenantName: string,
    businessType: string,
    subdomain: string
}

interface TenantAddress {
    address1: string,
    address2: string,
    country: string,
    district: string,
    subdistrict: string,
    province: string,
    zipcode: string
}

interface NewAdmin {
    fullName: string,
    email: string,
    confirmPassword: string
}