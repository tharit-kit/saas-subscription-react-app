import type { ApiResponse } from "../../../../shared/interfaces/ApiResponse";
import { apiClient } from "../../../../shared/lib/ApiClient";
import type { TenantRegistrationRequest, TenantRegistrationResponse } from "../../interfaces/AuthInterface";

export const registerService = async (request: TenantRegistrationRequest): Promise<ApiResponse<TenantRegistrationResponse>> => {
  const res = await apiClient.post<ApiResponse<TenantRegistrationResponse>>("/auth/register", request);
  return res.data;
};