"use server";

import { revalidatePath } from "next/cache";
import { isPluginActive } from "@venore/plugin-sdk";
import { createDiscInstance } from "../../index";

export type CreateDiscInstanceActionState = { error: string | null };

export async function createDiscInstanceAction(
  teamId: string,
  _prevState: CreateDiscInstanceActionState,
  formData: FormData,
): Promise<CreateDiscInstanceActionState> {
  if (!(await isPluginActive("disc"))) {
    return { error: "O plugin Teste DISC está desabilitado." };
  }

  const result = await createDiscInstance({
    teamId,
    environmentLabel: String(formData.get("environmentLabel") ?? "") || "Geral",
  });

  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath(`/disc/equipes/${teamId}`);
  return { error: null };
}
