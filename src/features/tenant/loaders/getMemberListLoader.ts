import { getMemberListService } from "../services/memberManagementService";

export async function getMemberListLoader() {
  const response = await getMemberListService();
  return response;
}
