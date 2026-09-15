import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { listTeamInstances } from "./service";
import type { ListTeamInstancesResult } from "./types";

export async function listTeamInstancesHandler(input: { teamId: string }): Promise<ListTeamInstancesResult> {
  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    return { success: false, error: { code: "unauthenticated", message: "É preciso estar logado." } };
  }
  return listTeamInstances({ teamId: input.teamId, actorId: currentUser.data.id });
}
