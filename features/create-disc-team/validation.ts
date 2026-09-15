import type { CreateDiscTeamInput } from "./types";

export function validateCreateDiscTeamInput(input: CreateDiscTeamInput): { code: string; message: string } | null {
  if (!input.name || !input.name.trim()) {
    return { code: "missing_name", message: "Informe um nome para a equipe." };
  }
  return null;
}
