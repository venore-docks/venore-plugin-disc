import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { AdminAccessDenied, Card, CardContent, EmptyState } from "@venore/plugin-sdk/ui";
import { listInstanceReports } from "../../index";

export const dynamic = "force-dynamic";

export default async function DiscInstanceResultsPage({
  params,
}: {
  params: Promise<{ teamId: string; instanceId: string }>;
}) {
  const { teamId, instanceId } = await params;

  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/disc/equipes/${teamId}/${instanceId}`)}`);
  }

  const reportsResult = await listInstanceReports({ instanceId });
  if (!reportsResult.success) {
    return <AdminAccessDenied message={reportsResult.error.message} />;
  }

  const reports = reportsResult.data;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Resultados</h1>
        <p className="text-sm text-muted-foreground">Todos os testes já respondidos por este link.</p>
      </div>

      {reports.length === 0 ? (
        <EmptyState title="Nenhum resultado ainda" description="Compartilhe o link de teste com a equipe para ver os resultados aqui." />
      ) : (
        <div className="flex flex-col gap-3">
          {reports.map((report) => (
            <Link key={report.id} href={`/disc/r/${report.id}`}>
              <Card className="transition-colors hover:bg-accent/10">
                <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                  <span className="font-medium">
                    {report.profileKey.toUpperCase()} / {report.profileKeySecondary.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">{new Date(report.createdAt).toLocaleString("pt-BR")}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
