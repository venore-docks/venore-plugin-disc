import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { scoreDisc } from "../../shared/disc-engine/score-disc";
import { insertDiscReport } from "./store";
import type { SubmitDiscReportCommand, SubmitDiscReportResult } from "./types";

export async function submitDiscReport(command: SubmitDiscReportCommand): Promise<SubmitDiscReportResult> {
  const handle = beginOperation({
    useCase: "disc.submit-disc-report",
    actor: command.actorId ? { id: command.actorId, type: "user" } : { id: "anonymous", type: "system" },
    kind: "write",
  });

  const dataset = scoreDisc(command.rawInput);

  const record = await insertDiscReport({
    userId: command.actorId,
    instanceId: command.instanceId ?? null,
    environmentLabel: command.environmentLabel.trim(),
    dataset,
    profileKey: dataset.more.profile,
    profileKeySecondary: dataset.less.profile,
    stress: String(dataset.stress),
  });

  endOperation(handle, { success: true });
  return { success: true, data: record };
}
