import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import apiClient from "../../../shared/lib/ApiClient";
import type {
  GetMemberListResponse,
  InviteMemberRequest,
  InviteMemberResponse,
} from "../interfaces/MemberManagementInterface";

export const getMemberListService = async (): Promise<ApiResponse<GetMemberListResponse>> => {
  const res = await apiClient.get<ApiResponse<GetMemberListResponse>>("/tenant/membership");
  return res.data;
};

export const inviteMemberService = async (
  request: InviteMemberRequest
): Promise<ApiResponse<InviteMemberResponse>> => {
  const res = await apiClient.post<ApiResponse<InviteMemberResponse>>(
    "/tenant/invite-member",
    request
  );
  return res.data;
};
