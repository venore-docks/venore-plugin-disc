import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { insertInstanceWithUniqueSlug, isTeamMember } from "./store";
import type { CreateDiscInstanceCommand, CreateDiscInstanceResult } from "./types";

export async function createDiscInstance(command: CreateDiscInstanceCommand): Promise<CreateDiscInstanceResult> {
  const handle = beginOperation({
    useCase: "disc.create-disc-instance",
    actor: command.actorId ? { id: command.actorId, type: "user" } : { id: "anonymous", type: "system" },
    kind: "write",
  });

  if (command.teamId) {
    if (!command.actorId) {
      const error = { code: "forbidden", message: "Uma instância de equipe precisa de um ator autenticado." };
      endOperation(handle, { success: false, error });
      return { success: false, error };
    }
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
    redirectUrl: command.redirectUrl ?? null,
    externalRef: command.externalRef ?? null,
  });

  endOperation(handle, { success: true });
  return { success: true, data: instance };
}
