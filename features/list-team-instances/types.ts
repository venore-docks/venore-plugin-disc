import type { OperationResult } from "@venore/plugin-sdk";

export type TeamInstanceSummary = {
  id: string;
  environmentLabel: string;
  shareSlug: string;
  createdAt: Date;
};

export type ListTeamInstancesQuery = { teamId: string; actorId: string };
export type ListTeamInstancesResult = OperationResult<TeamInstanceSummary[]>;
