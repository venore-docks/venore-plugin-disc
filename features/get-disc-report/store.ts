import { eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { discReports } from "../../database/schema";
import type { DiscReportRecord } from "../../contracts/types";

export async function findReportById(reportId: string): Promise<DiscReportRecord | undefined> {
  const [row] = await db.select().from(discReports).where(eq(discReports.id, reportId));
  return row as DiscReportRecord | undefined;
}
