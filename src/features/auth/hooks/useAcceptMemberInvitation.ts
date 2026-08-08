import { useState } from "react";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import { acceptMemberInvitationService } from "../services/authService";
import type {
  AcceptMemberInvitationRequest,
  AcceptMemberInvitationResponse,
} from "../interfaces/AuthInterface";

export function useAcceptMemberInvitation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse<AcceptMemberInvitationResponse> | null>(null);

  const acceptMemberInvitation = async (request: AcceptMemberInvitationRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await acceptMemberInvitationService(request);
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

  return { acceptMemberInvitation, loading, error, data };
}
