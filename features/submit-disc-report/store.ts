import { db } from "@venore/plugin-sdk";
import { discReports } from "../../database/schema";
import type { DiscReportRecord } from "../../contracts/types";
import type { DiscScoreResult } from "../../shared/disc-engine/score-disc";

export async function insertDiscReport(input: {
  userId: string | null;
  instanceId: string | null;
  environmentLabel: string;
  dataset: DiscScoreResult;
  profileKey: string;
  profileKeySecondary: string;
  stress: string;
}): Promise<DiscReportRecord> {
  const [row] = await db.insert(discReports).values(input).returning();
  return row as unknown as DiscReportRecord;
}
