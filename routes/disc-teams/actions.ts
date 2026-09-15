"use server";

import { isPluginActive } from "@venore/plugin-sdk";
import { createDiscTeam } from "../../index";
import type { CreateDiscTeamResult } from "../../index";

export type CreateDiscTeamActionState = { error: string | null };

export async function createDiscTeamAction(
  _prevState: CreateDiscTeamActionState,
  formData: FormData,
): Promise<CreateDiscTeamActionState> {
  if (!(await isPluginActive("disc"))) {
    return { error: "O plugin Teste DISC está desabilitado." };
  }

  const result: CreateDiscTeamResult = await createDiscTeam({
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? "") || undefined,
  });

  if (!result.success) {
    return { error: result.error.message };
  }

  return { error: null };
}
