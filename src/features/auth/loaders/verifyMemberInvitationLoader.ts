import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { verifyMemberInvitationService } from "../services/authService";

export async function verifyMemberInvitationLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return redirect("/invalid-invitation");
  }

  const response = await verifyMemberInvitationService({ token });

  return { response: response, token: token };
}
