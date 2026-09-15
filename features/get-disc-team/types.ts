import type { OperationResult } from "@venore/plugin-sdk";
import type { DiscTeamRecord } from "../../contracts/types";

export type GetDiscTeamQuery = { teamId: string; actorId: string };
export type GetDiscTeamResult = OperationResult<DiscTeamRecord>;
