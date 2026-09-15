import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { claimReportIfUnowned, findReportById } from "./store";
import type { ClaimDiscReportCommand, ClaimDiscReportResult } from "./types";

export async function claimDiscReport(command: ClaimDiscReportCommand): Promise<ClaimDiscReportResult> {
  const handle = beginOperation({
    useCase: "disc.claim-disc-report",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const existing = await findReportById(command.reportId);
  if (!existing) {
    const error = { code: "not_found", message: "Relatório não encontrado." };
    endOperation(handle, { success: false, error });
    return { success: false, error };
  }

  if (existing.userId && existing.userId !== command.actorId) {
    const error = { code: "already_claimed", message: "Este relatório já pertence a outra conta." };
    endOperation(handle, { success: false, error });
    return { success: false, error };
  }

  if (existing.userId === command.actorId) {
    endOperation(handle, { success: true });
    return { success: true, data: existing };
  }

  const claimed = await claimReportIfUnowned(command.reportId, command.actorId);
  if (!claimed) {
    const error = { code: "already_claimed", message: "Este relatório já pertence a outra conta." };
    endOperation(handle, { success: false, error });
    return { success: false, error };
  }

  endOperation(handle, { success: true });
  return { success: true, data: claimed };
}
