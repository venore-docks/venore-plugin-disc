import type { OperationResult } from "@venore/plugin-sdk";

export type DiscInstanceInviteView = {
  id: string;
  environmentLabel: string;
  teamName: string | null;
};

export type GetDiscInstanceBySlugQuery = { slug: string };
export type GetDiscInstanceBySlugResult = OperationResult<DiscInstanceInviteView>;
