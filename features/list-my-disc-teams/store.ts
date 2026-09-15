import { desc, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { discTeamMembers, discTeams } from "../../database/schema";

export async function findTeamsByMember(userId: string) {
  return db
    .select({
      id: discTeams.id,
      name: discTeams.name,
      description: discTeams.description,
      role: discTeamMembers.role,
      createdAt: discTeams.createdAt,
    })
    .from(discTeamMembers)
    .innerJoin(discTeams, eq(discTeams.id, discTeamMembers.teamId))
    .where(eq(discTeamMembers.userId, userId))
    .orderBy(desc(discTeams.createdAt));
}
