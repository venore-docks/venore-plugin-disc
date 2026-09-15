import type { OperationResult } from "@venore/plugin-sdk";
import type { DiscReportRecord } from "../../contracts/types";

export type ClaimDiscReportCommand = { reportId: string; actorId: string };
export type ClaimDiscReportInput = Omit<ClaimDiscReportCommand, "actorId">;
export type ClaimDiscReportResult = OperationResult<DiscReportRecord>;
