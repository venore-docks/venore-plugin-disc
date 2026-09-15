import { and, desc, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { discInstances, discTeamMembers } from "../../database/schema";

export async function isTeamMember(teamId: string, userId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: discTeamMembers.id })
    .from(discTeamMembers)
    .where(and(eq(discTeamMembers.teamId, teamId), eq(discTeamMembers.userId, userId)));
  return Boolean(row);
}

export async function findInstancesByTeam(teamId: string) {
  return db
    .select({
      id: discInstances.id,
      environmentLabel: discInstances.environmentLabel,
      shareSlug: discInstances.shareSlug,
      createdAt: discInstances.createdAt,
    })
    .from(discInstances)
    .where(eq(discInstances.teamId, teamId))
    .orderBy(desc(discInstances.createdAt));
}
