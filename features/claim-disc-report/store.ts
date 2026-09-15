import { and, eq, isNull } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { discReports } from "../../database/schema";
import type { DiscReportRecord } from "../../contracts/types";

export async function findReportById(reportId: string): Promise<DiscReportRecord | undefined> {
  const [row] = await db.select().from(discReports).where(eq(discReports.id, reportId));
  return row as DiscReportRecord | undefined;
}

// UPDATE ... WHERE user_id IS NULL: só reivindica um relatório ainda órfão. Se outra pessoa já
// logou primeiro pro mesmo relatório (corrida rara, mesmo link aberto em duas sessões), a
// atualização não afeta nenhuma linha e o caller trata como "já pertence a outra conta".
export async function claimReportIfUnowned(reportId: string, userId: string): Promise<DiscReportRecord | undefined> {
  const [row] = await db
    .update(discReports)
    .set({ userId })
    .where(and(eq(discReports.id, reportId), isNull(discReports.userId)))
    .returning();
  return row as DiscReportRecord | undefined;
}
