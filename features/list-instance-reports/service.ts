import { findInstanceOwnership, findReportsByInstance, isTeamMember } from "./store";
import type { ListInstanceReportsQuery, ListInstanceReportsResult } from "./types";

// BYPASS deliberado de ownership — só pra um plugin externo (ex: vagas) que criou a instância via
// createDiscInstanceExternal e já validou a própria permissão de negócio antes de chamar isto
// (ex: vagas.applications.review). Instância anônima/pessoal não tem "membro" pra checar, então
// não dá pra reusar a listagem normal (que exige teamId, ver comentário abaixo). Nunca chamar a
// partir de uma action/UI que não tenha checado autorização antes.
export async function listInstanceReportsExternal(instanceId: string): Promise<ListInstanceReportsResult> {
  const rows = await findReportsByInstance(instanceId);
  return { success: true, data: rows };
}

// Instância pessoal (teamId nulo): só quem a criou vê os relatórios — não há "membro" pra checar,
// então o dono é o próprio createdByUserId, mas como não lemos esse campo aqui (a query de
// ownership só traz teamId), instância pessoal fica só visível pra quem tem o link do relatório
// individual (/disc/r/:reportId), não por esta listagem agregada.
export async function listInstanceReports(query: ListInstanceReportsQuery): Promise<ListInstanceReportsResult> {
  const instance = await findInstanceOwnership(query.instanceId);
  if (!instance) {
    return { success: false, error: { code: "not_found", message: "Instância não encontrada." } };
  }
  if (!instance.teamId) {
    return { success: false, error: { code: "forbidden", message: "Instância pessoal não tem listagem agregada." } };
  }

  const member = await isTeamMember(instance.teamId, query.actorId);
  if (!member) {
    return { success: false, error: { code: "forbidden", message: "Você não faz parte desta equipe." } };
  }

  const rows = await findReportsByInstance(query.instanceId);
  return { success: true, data: rows };
}
