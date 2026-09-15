import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { createDiscTeam } from "./service";
import { validateCreateDiscTeamInput } from "./validation";
import type { CreateDiscTeamInput, CreateDiscTeamResult } from "./types";

export async function createDiscTeamHandler(input: CreateDiscTeamInput): Promise<CreateDiscTeamResult> {
  const validationError = validateCreateDiscTeamInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    return { success: false, error: { code: "unauthenticated", message: "É preciso estar logado para criar uma equipe." } };
  }

  return createDiscTeam({ ...input, actorId: currentUser.data.id });
}
