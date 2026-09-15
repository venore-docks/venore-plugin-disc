import { describeDiscProfile } from "../../shared/disc-engine/questions";
import type { DiscReportRecord } from "../../contracts/types";
import type { DiscReportView } from "./types";

export function toDiscReportView(record: DiscReportRecord): DiscReportView {
  return {
    id: record.id,
    environmentLabel: record.environmentLabel,
    dataset: record.dataset,
    createdAt: record.createdAt,
    moreProfile: describeDiscProfile(record.profileKey),
    lessProfile: describeDiscProfile(record.profileKeySecondary),
    isClaimed: record.userId !== null,
  };
}
