import type { OperationResult } from "@venore/plugin-sdk";

export type InstanceReportSummary = {
  id: string;
  profileKey: string;
  profileKeySecondary: string;
  createdAt: Date;
};

export type ListInstanceReportsQuery = { instanceId: string; actorId: string };
export type ListInstanceReportsResult = OperationResult<InstanceReportSummary[]>;
