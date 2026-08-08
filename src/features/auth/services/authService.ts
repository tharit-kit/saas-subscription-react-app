import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import apiClient from "../../../shared/lib/ApiClient";
import type {
  AcceptMemberInvitationRequest,
  AcceptMemberInvitationResponse,
  EmailVerificationResponse,
  LoginRequest,
  LoginResponse,
  TenantRegistrationRequest,
  TenantRegistrationResponse,
  VerifyMemberInvitationRequest,
  VerifyMemberInvitationResponse,
} from "../interfaces/AuthInterface";

export const registerService = async (
  request: TenantRegistrationRequest
): Promise<ApiResponse<TenantRegistrationResponse>> => {
  const res = await apiClient.post<ApiResponse<TenantRegistrationResponse>>(
    "/auth/register",
    request
  );
  return res.data;
};

export const verifyEmailService = async (
  tokenId: string
): Promise<ApiResponse<EmailVerificationResponse>> => {
  const res = await apiClient.post<ApiResponse<EmailVerificationResponse>>(
    "/auth/verify-email",
    tokenId
  );
  return res.data;
};

export const resendVerificationEmailService = async (userId: string, tenantId: string) => {
  const res = await apiClient.post<ApiResponse<null>>("/auth/resend-verification-email", {
    userId,
    tenantId,
  });
  return res.data;
};

export const loginService = async (request: LoginRequest) => {
  const res = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", request);

  return res.data;
};

export const verifyMemberInvitationService = async (request: VerifyMemberInvitationRequest) => {
  const res = await apiClient.post<ApiResponse<VerifyMemberInvitationResponse>>(
    "/tenant/verify-member-invitation",
    request
  );

  return res.data;
};

export const acceptMemberInvitationService = async (request: AcceptMemberInvitationRequest) => {
  const res = await apiClient.post<ApiResponse<AcceptMemberInvitationResponse>>(
    "/tenant/accept-member-invitation",
    request
  );

  return res.data;
};
