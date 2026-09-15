import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { getDiscTeam } from "./service";
import type { GetDiscTeamResult } from "./types";

export async function getDiscTeamHandler(input: { teamId: string }): Promise<GetDiscTeamResult> {
  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    return { success: false, error: { code: "unauthenticated", message: "É preciso estar logado." } };
  }
  return getDiscTeam({ teamId: input.teamId, actorId: currentUser.data.id });
}
