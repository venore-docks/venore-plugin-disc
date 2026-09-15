import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@venore/plugin-sdk/ui";
import { claimDiscReport, getDiscReport } from "../../index";
import { DiscBarChart } from "./charts/disc-bar-chart";
import { DiscSurfaceChart } from "./charts/disc-surface-chart";
import { DiscReportPrintButton } from "./print-button";

export const dynamic = "force-dynamic";

export default async function DiscReportPage({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params;
  const reportResult = await getDiscReport({ reportId });
  if (!reportResult.success) {
    notFound();
  }
  let report = reportResult.data;

  // Login só entra na hora de salvar/ver o resultado (fluxo simplificado pedido) — se a sessão já
  // existe e o relatório ainda está órfão, reivindica pra essa conta antes de renderizar.
  const currentUserResult = await getCurrentUser();
  const currentUser = currentUserResult.success ? currentUserResult.data : null;
  if (currentUser && !report.isClaimed) {
    const claimed = await claimDiscReport({ reportId });
    if (claimed.success) {
      report = { ...report, isClaimed: true };
    }
  }

  const { dataset } = report;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 py-8 print:gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Resultado do teste DISC</h1>
          <p className="text-sm text-muted-foreground">Ambiente considerado: {report.environmentLabel}</p>
        </div>
        <DiscReportPrintButton />
      </div>

      {!report.isClaimed && !currentUser && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-panel border border-warning-border bg-warning-soft p-4 text-sm print:hidden">
          <span>Faça login para salvar este resultado na sua conta — sem isso, só quem tem este link consegue vê-lo.</span>
          <Button asChild size="sm">
            <Link href={`/api/auth/signin?callbackUrl=${encodeURIComponent(`/disc/r/${report.id}`)}`}>Fazer login</Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 print:grid-cols-2 print:gap-3 lg:grid-cols-2">
        <Card className="lg:col-span-2 print:col-span-2">
          <CardHeader>
            <CardTitle>Seu perfil comportamental</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Autoimagem externa</p>
              <p className="text-lg font-semibold">{report.moreProfile?.profile ?? dataset.more.profile.toUpperCase()}</p>
              <p className="text-sm text-muted-foreground">{report.moreProfile?.description}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Autoimagem interna</p>
              <p className="text-lg font-semibold">{report.lessProfile?.profile ?? dataset.less.profile.toUpperCase()}</p>
              <p className="text-sm text-muted-foreground">{report.lessProfile?.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="print:text-sm">Autoimagem externa e interna</CardTitle>
          </CardHeader>
          <CardContent className="print:text-xs">
            <p className="mb-4 text-sm text-muted-foreground print:text-xs">
              A autoimagem externa reflete o comportamento presente; a interna revela o comportamento
              desejado.
            </p>
            <DiscBarChart more={dataset.more.percentual} less={dataset.less.percentual} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="print:text-sm">Gráfico de superfície</CardTitle>
          </CardHeader>
          <CardContent className="print:p-3">
            <DiscSurfaceChart more={dataset.more.percentual} less={dataset.less.percentual} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 print:col-span-2">
          <CardHeader>
            <CardTitle className="print:text-sm">Nível de tensão</CardTitle>
          </CardHeader>
          <CardContent className="print:text-xs">
            <p className="text-sm text-muted-foreground print:text-xs">
              Diferença entre a autoimagem externa e interna — quanto maior, mais distante o
              comportamento observável está do comportamento desejado.
            </p>
            <p className="mt-2 text-3xl font-semibold">{dataset.stress}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
