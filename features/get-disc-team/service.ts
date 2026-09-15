import { findTeamById, isTeamMember } from "./store";
import type { GetDiscTeamQuery, GetDiscTeamResult } from "./types";

export async function getDiscTeam(query: GetDiscTeamQuery): Promise<GetDiscTeamResult> {
  const member = await isTeamMember(query.teamId, query.actorId);
  if (!member) {
    return { success: false, error: { code: "forbidden", message: "Você não faz parte desta equipe." } };
  }
  const team = await findTeamById(query.teamId);
  if (!team) {
    return { success: false, error: { code: "not_found", message: "Equipe não encontrada." } };
  }
  return { success: true, data: team };
}
