import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { submitDiscReport } from "./service";
import { validateSubmitDiscReportInput } from "./validation";
import type { SubmitDiscReportInput, SubmitDiscReportResult } from "./types";

// Sem authorizeActor de propósito — fazer o teste é público (fluxo simplificado pedido: "acessa,
// clica, faz o teste sem login"). Quando já existe uma sessão, o relatório nasce vinculado
// direto; senão nasce com userId nulo e features/claim-disc-report o vincula no momento do login.
export async function submitDiscReportHandler(input: SubmitDiscReportInput): Promise<SubmitDiscReportResult> {
  const validationError = validateSubmitDiscReportInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const currentUser = await getCurrentUser();
  const actorId = currentUser.success && currentUser.data ? currentUser.data.id : null;

  return submitDiscReport({ ...input, actorId });
}
