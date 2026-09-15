import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { claimDiscReport } from "./service";
import type { ClaimDiscReportInput, ClaimDiscReportResult } from "./types";

export async function claimDiscReportHandler(input: ClaimDiscReportInput): Promise<ClaimDiscReportResult> {
  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    return { success: false, error: { code: "unauthenticated", message: "É preciso estar logado para salvar o resultado." } };
  }

  return claimDiscReport({ ...input, actorId: currentUser.data.id });
}
