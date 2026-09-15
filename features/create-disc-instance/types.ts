import type { OperationResult } from "@venore/plugin-sdk";
import type { DiscInstanceRecord } from "../../contracts/types";

export type CreateDiscInstanceCommand = {
  teamId?: string | null;
  environmentLabel: string;
  actorId: string;
};
export type CreateDiscInstanceInput = Omit<CreateDiscInstanceCommand, "actorId">;
export type CreateDiscInstanceResult = OperationResult<DiscInstanceRecord>;
