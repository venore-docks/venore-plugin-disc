import { getDiscInstanceBySlug } from "./service";
import type { GetDiscInstanceBySlugQuery, GetDiscInstanceBySlugResult } from "./types";

// Público de propósito — é a tela de convite (/disc/d/:slug), ninguém precisa estar logado pra
// ver "você foi convidado a fazer o teste".
export async function getDiscInstanceBySlugHandler(query: GetDiscInstanceBySlugQuery): Promise<GetDiscInstanceBySlugResult> {
  return getDiscInstanceBySlug(query);
}
