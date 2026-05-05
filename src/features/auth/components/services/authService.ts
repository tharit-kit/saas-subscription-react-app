import type { ApiResponse } from "../../../../shared/interfaces/ApiResponse";
import apiClient from "../../../../shared/lib/ApiClient";
import type { EmailVerificationResponse, LoginRequest, LoginResponse, TenantRegistrationRequest, TenantRegistrationResponse } from "../../interfaces/AuthInterface";

export const registerService = async (request: TenantRegistrationRequest): Promise<ApiResponse<TenantRegistrationResponse>> => {
  const res = await apiClient.post<ApiResponse<TenantRegistrationResponse>>("/auth/register", request);
  return res.data;
};

export const verifyEmailService = async (tokenId: string): Promise<ApiResponse<EmailVerificationResponse>> => {
  const res = await apiClient.post<ApiResponse<EmailVerificationResponse>>("/auth/verify-email", tokenId);
  return res.data;
}

export const resendVerificationEmailService = async (userId: string, tenantId: string) => {
  const res = await apiClient.post<ApiResponse<null>>("/auth/resend-verification-email", 
    {
      userId, 
      tenantId
    });
  return res.data;
}

export const loginService = async (request: LoginRequest) => {
  const res = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", request);

  return res.data;
}