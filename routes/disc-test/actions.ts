"use server";

import { isPluginActive } from "@venore/plugin-sdk";
import { submitDiscReport } from "../../index";
import type { SubmitDiscReportInput, SubmitDiscReportResult } from "../../index";

export async function submitDiscReportAction(input: SubmitDiscReportInput): Promise<SubmitDiscReportResult> {
  if (!(await isPluginActive("disc"))) {
    return { success: false, error: { code: "plugin_disabled", message: "O teste DISC está desabilitado." } };
  }
  return submitDiscReport(input);
}
