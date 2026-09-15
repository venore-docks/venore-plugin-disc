import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { Card, CardContent, EmptyState } from "@venore/plugin-sdk/ui";
import { listMyDiscReports } from "../../index";

export const dynamic = "force-dynamic";

export default async function DiscMyResultsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent("/disc/meus-resultados")}`);
  }

  const reportsResult = await listMyDiscReports();
  const reports = reportsResult.success ? reportsResult.data : [];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Meus resultados</h1>
        <p className="text-sm text-muted-foreground">Todos os testes DISC que você já fez.</p>
      </div>

      {reports.length === 0 ? (
        <EmptyState title="Nenhum resultado ainda" description="Faça o teste DISC para ver seu resultado aqui." />
      ) : (
        <div className="flex flex-col gap-3">
          {reports.map((report) => (
            <Link key={report.id} href={`/disc/r/${report.id}`}>
              <Card className="transition-colors hover:bg-accent/10">
                <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                  <div>
                    <p className="font-medium">{report.profileKey.toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground">{report.environmentLabel}</p>
                  </div>
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
