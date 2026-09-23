import type { OperationResult } from "@venore/plugin-sdk";
import type { DiscInstanceRecord } from "../../contracts/types";

export type CreateDiscInstanceCommand = {
  teamId?: string | null;
  environmentLabel: string;
  // Nullable — createDiscInstanceExternal (chamada por outro plugin, ex: vagas) não tem ator
  // autenticado. teamId exige actorId (validado em service.ts); instância pessoal aceita null.
  actorId: string | null;
  // Só usados por chamadas externas — o fluxo de UI do próprio disc (createDiscInstanceHandler)
  // nunca preenche isso.
  redirectUrl?: string | null;
  externalRef?: string | null;
};
export type CreateDiscInstanceInput = Omit<CreateDiscInstanceCommand, "actorId">;
export type CreateDiscInstanceResult = OperationResult<DiscInstanceRecord>;
