import { DISC_QUESTIONS } from "../../shared/disc-engine/questions";
import type { SubmitDiscReportInput } from "./types";

export function validateSubmitDiscReportInput(input: SubmitDiscReportInput): { code: string; message: string } | null {
  const expected = DISC_QUESTIONS.length;
  const moreCount = Object.keys(input.rawInput?.more ?? {}).length;
  const lessCount = Object.keys(input.rawInput?.less ?? {}).length;

  if (moreCount !== expected || lessCount !== expected) {
    return {
      code: "incomplete_answers",
      message: `O teste tem ${expected} perguntas — respostas incompletas (mais: ${moreCount}, menos: ${lessCount}).`,
    };
  }

  if (!input.environmentLabel || !input.environmentLabel.trim()) {
    return { code: "missing_environment", message: "Informe o ambiente considerado no teste." };
  }

  return null;
}
