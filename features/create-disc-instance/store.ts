import { and, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { discInstances, discTeamMembers } from "../../database/schema";
import { generateShortSlug } from "../../shared/short-slug";
import type { DiscInstanceRecord } from "../../contracts/types";

export async function isTeamMember(teamId: string, userId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: discTeamMembers.id })
    .from(discTeamMembers)
    .where(and(eq(discTeamMembers.teamId, teamId), eq(discTeamMembers.userId, userId)));
  return Boolean(row);
}

const MAX_SLUG_ATTEMPTS = 5;

// Retry no colisão do slug curto (8 caracteres base36 — colisão é rara, mas não impossível) em vez
// de checar disponibilidade antes: menos uma ida ao banco no caminho feliz, e o UNIQUE constraint
// já garante a corrida contra outra instância sendo criada ao mesmo tempo.
export async function insertInstanceWithUniqueSlug(input: {
  teamId: string | null;
  environmentLabel: string;
  createdByUserId: string;
}): Promise<DiscInstanceRecord> {
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS; attempt++) {
    try {
      const [row] = await db
        .insert(discInstances)
        .values({ ...input, shareSlug: generateShortSlug() })
        .returning();
      return row as DiscInstanceRecord;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
