export { discBreadcrumbSegments } from "./breadcrumbs";

export { submitDiscReportHandler as submitDiscReport } from "./features/submit-disc-report/handler";
export { claimDiscReportHandler as claimDiscReport } from "./features/claim-disc-report/handler";
export { getDiscReportHandler as getDiscReport } from "./features/get-disc-report/handler";
export { listMyDiscReportsHandler as listMyDiscReports } from "./features/list-my-disc-reports/handler";
export { createDiscTeamHandler as createDiscTeam } from "./features/create-disc-team/handler";
export { getDiscTeamHandler as getDiscTeam } from "./features/get-disc-team/handler";
export { listMyDiscTeamsHandler as listMyDiscTeams } from "./features/list-my-disc-teams/handler";
export { createDiscInstanceHandler as createDiscInstance } from "./features/create-disc-instance/handler";
export { getDiscInstanceBySlugHandler as getDiscInstanceBySlug } from "./features/get-disc-instance-by-slug/handler";
export { listInstanceReportsHandler as listInstanceReports } from "./features/list-instance-reports/handler";
export { listTeamInstancesHandler as listTeamInstances } from "./features/list-team-instances/handler";

export { DISC_QUESTIONS, DISC_HOWTO, DISC_VALUES, describeDiscProfile } from "./shared/disc-engine/questions";
export { scoreDisc } from "./shared/disc-engine/score-disc";
export { shuffleInPlace } from "./shared/disc-engine/shuffle";

export type { DiscReportRecord, DiscTeamRecord, DiscTeamMemberRecord, DiscInstanceRecord } from "./contracts/types";
export type { SubmitDiscReportInput, SubmitDiscReportResult } from "./features/submit-disc-report/types";
export type { ClaimDiscReportInput, ClaimDiscReportResult } from "./features/claim-disc-report/types";
export type { GetDiscReportResult, DiscReportView } from "./features/get-disc-report/types";
export type { ListMyDiscReportsResult, MyDiscReportSummary } from "./features/list-my-disc-reports/types";
export type { CreateDiscTeamInput, CreateDiscTeamResult } from "./features/create-disc-team/types";
export type { GetDiscTeamResult } from "./features/get-disc-team/types";
export type { ListMyDiscTeamsResult, MyDiscTeamSummary } from "./features/list-my-disc-teams/types";
export type { CreateDiscInstanceInput, CreateDiscInstanceResult } from "./features/create-disc-instance/types";
export type { GetDiscInstanceBySlugResult, DiscInstanceInviteView } from "./features/get-disc-instance-by-slug/types";
export type { ListInstanceReportsResult, InstanceReportSummary } from "./features/list-instance-reports/types";
export type { ListTeamInstancesResult, TeamInstanceSummary } from "./features/list-team-instances/types";
