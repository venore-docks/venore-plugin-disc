import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { listMyDiscReports } from "./service";
import type { ListMyDiscReportsResult } from "./types";

export async function listMyDiscReportsHandler(): Promise<ListMyDiscReportsResult> {
  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    return { success: false, error: { code: "unauthenticated", message: "É preciso estar logado." } };
  }
  return listMyDiscReports(currentUser.data.id);
}
