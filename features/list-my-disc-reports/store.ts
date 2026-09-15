import { desc, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { discReports } from "../../database/schema";

export async function findReportsByUser(userId: string) {
  return db
    .select({
      id: discReports.id,
      environmentLabel: discReports.environmentLabel,
      profileKey: discReports.profileKey,
      createdAt: discReports.createdAt,
    })
    .from(discReports)
    .where(eq(discReports.userId, userId))
    .orderBy(desc(discReports.createdAt));
}
