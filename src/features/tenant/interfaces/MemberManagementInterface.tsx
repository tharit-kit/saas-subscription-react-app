export interface GetMemberListResponse {
  memberInfos: MemberInfo[];
}

export interface MemberInfo {
  fullName: string;
  email: string;
  role: string;
  memberStatus: string;
  joinAt: string;
}

export interface InviteMemberRequest {
  email: string;
  role: string;
}

export interface InviteMemberResponse {
  invitationId: string;
}
