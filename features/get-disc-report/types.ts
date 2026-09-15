import type { OperationResult } from "@venore/plugin-sdk";
import type { DiscScoreResult } from "../../shared/disc-engine/score-disc";
import type { DiscProfileEntry } from "../../shared/disc-engine/questions";

export type DiscReportView = {
  id: string;
  environmentLabel: string;
  dataset: DiscScoreResult;
  createdAt: Date;
  moreProfile: DiscProfileEntry | undefined;
  lessProfile: DiscProfileEntry | undefined;
  isClaimed: boolean;
};

export type GetDiscReportQuery = { reportId: string };
export type GetDiscReportResult = OperationResult<DiscReportView>;
