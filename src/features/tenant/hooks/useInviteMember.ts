import { useState } from "react";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import type {
  InviteMemberRequest,
  InviteMemberResponse,
} from "../interfaces/MemberManagementInterface";
import { inviteMemberService } from "../services/memberManagementService";

export function useInviteMember() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse<InviteMemberResponse> | null>(null);

  const inviteMember = async (request: InviteMemberRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await inviteMemberService(request);
      setData(response);

      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { inviteMember, loading, error, data };
}
