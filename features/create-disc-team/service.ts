import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { insertTeamWithOwner } from "./store";
import type { CreateDiscTeamCommand, CreateDiscTeamResult } from "./types";

export async function createDiscTeam(command: CreateDiscTeamCommand): Promise<CreateDiscTeamResult> {
  const handle = beginOperation({
    useCase: "disc.create-disc-team",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const team = await insertTeamWithOwner({
    name: command.name.trim(),
    description: command.description?.trim() || null,
    ownerUserId: command.actorId,
  });

  endOperation(handle, { success: true });
  return { success: true, data: team };
}
