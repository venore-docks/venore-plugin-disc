import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { listInstanceReports } from "./service";
import type { ListInstanceReportsResult } from "./types";

export async function listInstanceReportsHandler(input: { instanceId: string }): Promise<ListInstanceReportsResult> {
  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    return { success: false, error: { code: "unauthenticated", message: "É preciso estar logado." } };
  }
  return listInstanceReports({ instanceId: input.instanceId, actorId: currentUser.data.id });
}
