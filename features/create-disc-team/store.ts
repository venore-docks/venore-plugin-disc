import { db } from "@venore/plugin-sdk";
import { discTeamMembers, discTeams } from "../../database/schema";
import type { DiscTeamRecord } from "../../contracts/types";

export async function insertTeamWithOwner(input: {
  name: string;
  description: string | null;
  ownerUserId: string;
}): Promise<DiscTeamRecord> {
  return db.transaction(async (tx) => {
    const [team] = await tx
      .insert(discTeams)
      .values({ name: input.name, description: input.description, ownerUserId: input.ownerUserId })
      .returning();

    await tx.insert(discTeamMembers).values({ teamId: team.id, userId: input.ownerUserId, role: "admin" });

    return team as DiscTeamRecord;
  });
}
