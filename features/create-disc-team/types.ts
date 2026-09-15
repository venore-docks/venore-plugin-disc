import type { OperationResult } from "@venore/plugin-sdk";
import type { DiscTeamRecord } from "../../contracts/types";

export type CreateDiscTeamCommand = { name: string; description?: string | null; actorId: string };
export type CreateDiscTeamInput = Omit<CreateDiscTeamCommand, "actorId">;
export type CreateDiscTeamResult = OperationResult<DiscTeamRecord>;
