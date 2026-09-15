import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { insertInstanceWithUniqueSlug, isTeamMember } from "./store";
import type { CreateDiscInstanceCommand, CreateDiscInstanceResult } from "./types";

export async function createDiscInstance(command: CreateDiscInstanceCommand): Promise<CreateDiscInstanceResult> {
  const handle = beginOperation({
    useCase: "disc.create-disc-instance",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  if (command.teamId) {
    const member = await isTeamMember(command.teamId, command.actorId);
    if (!member) {
      const error = { code: "forbidden", message: "Você não faz parte desta equipe." };
      endOperation(handle, { success: false, error });
      return { success: false, error };
    }
  }

  const instance = await insertInstanceWithUniqueSlug({
    teamId: command.teamId ?? null,
    environmentLabel: command.environmentLabel.trim() || "Geral",
    createdByUserId: command.actorId,
  });

  endOperation(handle, { success: true });
  return { success: true, data: instance };
}
