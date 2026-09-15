import type { OperationResult } from "@venore/plugin-sdk";
import type { DiscReportRecord } from "../../contracts/types";
import type { RawDiscInput } from "../../shared/disc-engine/score-disc";

export type SubmitDiscReportCommand = {
  rawInput: RawDiscInput;
  environmentLabel: string;
  instanceId?: string | null;
  actorId: string | null;
};

export type SubmitDiscReportInput = Omit<SubmitDiscReportCommand, "actorId">;
export type SubmitDiscReportResult = OperationResult<DiscReportRecord>;
