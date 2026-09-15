import type { OperationResult } from "@venore/plugin-sdk";
import type { DiscTeamMemberRole } from "../../contracts/types";

export type MyDiscTeamSummary = {
  id: string;
  name: string;
  description: string | null;
  role: DiscTeamMemberRole;
  createdAt: Date;
};

export type ListMyDiscTeamsResult = OperationResult<MyDiscTeamSummary[]>;
