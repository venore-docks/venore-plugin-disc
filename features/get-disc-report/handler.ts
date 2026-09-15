import { getDiscReport } from "./service";
import type { GetDiscReportQuery, GetDiscReportResult } from "./types";

// Sem authorizeActor nem gate de dono: o link do relatório (/disc/r/:reportId) é o próprio
// mecanismo de compartilhamento — quem tem o link vê o relatório, mesmo padrão de
// list-public-birthdays (público por design, não por descuido).
export async function getDiscReportHandler(query: GetDiscReportQuery): Promise<GetDiscReportResult> {
  return getDiscReport(query);
}
