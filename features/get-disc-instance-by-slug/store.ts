import { eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { discInstances, discTeams } from "../../database/schema";

export async function findInstanceBySlug(slug: string) {
  const [row] = await db
    .select({
      id: discInstances.id,
      environmentLabel: discInstances.environmentLabel,
      teamName: discTeams.name,
    })
    .from(discInstances)
    .leftJoin(discTeams, eq(discTeams.id, discInstances.teamId))
    .where(eq(discInstances.shareSlug, slug));
  return row;
}
