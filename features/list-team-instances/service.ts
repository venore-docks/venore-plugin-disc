import { findInstancesByTeam, isTeamMember } from "./store";
import type { ListTeamInstancesQuery, ListTeamInstancesResult } from "./types";

export async function listTeamInstances(query: ListTeamInstancesQuery): Promise<ListTeamInstancesResult> {
  const member = await isTeamMember(query.teamId, query.actorId);
  if (!member) {
    return { success: false, error: { code: "forbidden", message: "Você não faz parte desta equipe." } };
  }
  const rows = await findInstancesByTeam(query.teamId);
  return { success: true, data: rows };
}
