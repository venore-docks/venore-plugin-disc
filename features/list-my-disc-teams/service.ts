import { findTeamsByMember } from "./store";
import type { ListMyDiscTeamsResult, MyDiscTeamSummary } from "./types";

export async function listMyDiscTeams(userId: string): Promise<ListMyDiscTeamsResult> {
  const rows = await findTeamsByMember(userId);
  return { success: true, data: rows as MyDiscTeamSummary[] };
}
