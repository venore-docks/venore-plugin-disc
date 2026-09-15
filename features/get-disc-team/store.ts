import { and, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { discTeamMembers, discTeams } from "../../database/schema";
import type { DiscTeamRecord } from "../../contracts/types";

export async function isTeamMember(teamId: string, userId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: discTeamMembers.id })
    .from(discTeamMembers)
    .where(and(eq(discTeamMembers.teamId, teamId), eq(discTeamMembers.userId, userId)));
  return Boolean(row);
}

export async function findTeamById(teamId: string): Promise<DiscTeamRecord | undefined> {
  const [row] = await db.select().from(discTeams).where(eq(discTeams.id, teamId));
  return row as DiscTeamRecord | undefined;
}
