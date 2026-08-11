import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import apiClient from "../../../shared/lib/ApiClient";
import type { GetMemberListResponse } from "../interfaces/MemberManagementInterface";

export const getMemberListService = async (): Promise<ApiResponse<GetMemberListResponse>> => {
  const res = await apiClient.get<ApiResponse<GetMemberListResponse>>("/tenant/membership");
  return res.data;
};
