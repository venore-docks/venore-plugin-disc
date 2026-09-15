import { findReportsByUser } from "./store";
import type { ListMyDiscReportsResult } from "./types";

export async function listMyDiscReports(userId: string): Promise<ListMyDiscReportsResult> {
  const rows = await findReportsByUser(userId);
  return { success: true, data: rows };
}
