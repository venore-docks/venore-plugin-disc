import { findReportById } from "./store";
import { toDiscReportView } from "./view";
import type { GetDiscReportQuery, GetDiscReportResult } from "./types";

export async function getDiscReport(query: GetDiscReportQuery): Promise<GetDiscReportResult> {
  const record = await findReportById(query.reportId);
  if (!record) {
    return { success: false, error: { code: "not_found", message: "Relatório não encontrado." } };
  }
  return { success: true, data: toDiscReportView(record) };
}
