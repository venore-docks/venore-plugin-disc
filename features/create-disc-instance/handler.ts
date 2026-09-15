import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { createDiscInstance } from "./service";
import type { CreateDiscInstanceInput, CreateDiscInstanceResult } from "./types";

export async function createDiscInstanceHandler(input: CreateDiscInstanceInput): Promise<CreateDiscInstanceResult> {
  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    return { success: false, error: { code: "unauthenticated", message: "É preciso estar logado para gerar um link de teste." } };
  }
  return createDiscInstance({ ...input, actorId: currentUser.data.id });
}
