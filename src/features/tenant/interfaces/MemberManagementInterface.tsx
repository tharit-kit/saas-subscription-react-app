export interface GetMemberListResponse {
  memberInfos: MemberInfo[];
}

export interface MemberInfo {
  fullName: string;
  role: string;
  memberStatus: string;
  joinAt: string;
}
