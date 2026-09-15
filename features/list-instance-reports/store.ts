import { and, desc, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { discInstances, discReports, discTeamMembers } from "../../database/schema";

export async function findInstanceOwnership(instanceId: string): Promise<{ teamId: string | null } | undefined> {
  const [row] = await db.select({ teamId: discInstances.teamId }).from(discInstances).where(eq(discInstances.id, instanceId));
  return row;
}

export async function isTeamMember(teamId: string, userId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: discTeamMembers.id })
    .from(discTeamMembers)
    .where(and(eq(discTeamMembers.teamId, teamId), eq(discTeamMembers.userId, userId)));
  return Boolean(row);
}

export async function findReportsByInstance(instanceId: string) {
  return db
    .select({
      id: discReports.id,
      profileKey: discReports.profileKey,
      profileKeySecondary: discReports.profileKeySecondary,
      createdAt: discReports.createdAt,
    })
    .from(discReports)
    .where(eq(discReports.instanceId, instanceId))
    .orderBy(desc(discReports.createdAt));
}
