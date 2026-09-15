import type { OperationResult } from "@venore/plugin-sdk";

export type MyDiscReportSummary = {
  id: string;
  environmentLabel: string;
  profileKey: string;
  createdAt: Date;
};

export type ListMyDiscReportsResult = OperationResult<MyDiscReportSummary[]>;
