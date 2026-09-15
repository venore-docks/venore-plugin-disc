import type { DiscScoreResult } from "../shared/disc-engine/score-disc";

export type DiscReportRecord = {
  id: string;
  userId: string | null;
  instanceId: string | null;
  environmentLabel: string;
  dataset: DiscScoreResult;
  profileKey: string;
  profileKeySecondary: string;
  stress: string;
  createdAt: Date;
};

export type DiscTeamRecord = {
  id: string;
  ownerUserId: string;
  name: string;
  description: string | null;
  createdAt: Date;
};

export type DiscTeamMemberRole = "admin" | "member";

export type DiscTeamMemberRecord = {
  id: string;
  teamId: string;
  userId: string;
  role: DiscTeamMemberRole;
  createdAt: Date;
};

export type DiscInstanceRecord = {
  id: string;
  teamId: string | null;
  environmentLabel: string;
  shareSlug: string;
  createdByUserId: string;
  createdAt: Date;
};
