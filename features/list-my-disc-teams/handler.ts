import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { listMyDiscTeams } from "./service";
import type { ListMyDiscTeamsResult } from "./types";

export async function listMyDiscTeamsHandler(): Promise<ListMyDiscTeamsResult> {
  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    return { success: false, error: { code: "unauthenticated", message: "É preciso estar logado." } };
  }
  return listMyDiscTeams(currentUser.data.id);
}
