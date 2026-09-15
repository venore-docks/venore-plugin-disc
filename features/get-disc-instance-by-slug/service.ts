import { findInstanceBySlug } from "./store";
import type { GetDiscInstanceBySlugQuery, GetDiscInstanceBySlugResult } from "./types";

export async function getDiscInstanceBySlug(query: GetDiscInstanceBySlugQuery): Promise<GetDiscInstanceBySlugResult> {
  const row = await findInstanceBySlug(query.slug);
  if (!row) {
    return { success: false, error: { code: "not_found", message: "Convite não encontrado — o link pode estar errado ou ter sido removido." } };
  }
  return { success: true, data: row };
}
