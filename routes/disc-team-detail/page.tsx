import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { AdminAccessDenied, Card, CardContent, CardHeader, CardTitle, EmptyState } from "@venore/plugin-sdk/ui";
import { getDiscTeam, listTeamInstances } from "../../index";
import { CreateDiscInstanceForm } from "./create-instance-form";
import { CopyLinkButton } from "./copy-link-button";

export const dynamic = "force-dynamic";

export default async function DiscTeamDetailPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;

  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/disc/equipes/${teamId}`)}`);
  }

  const teamResult = await getDiscTeam({ teamId });
  if (!teamResult.success) {
    return <AdminAccessDenied message={teamResult.error.message} />;
  }

  const instancesResult = await listTeamInstances({ teamId });
  const instances = instancesResult.success ? instancesResult.data : [];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{teamResult.data.name}</h1>
        {teamResult.data.description && <p className="text-sm text-muted-foreground">{teamResult.data.description}</p>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novo link de teste</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateDiscInstanceForm teamId={teamId} />
        </CardContent>
      </Card>

      {instances.length === 0 ? (
        <EmptyState title="Nenhum link de teste ainda" description="Gere um link acima para compartilhar com a equipe." />
      ) : (
        <div className="flex flex-col gap-3">
          {instances.map((instance) => (
            <Card key={instance.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                <div>
                  <p className="font-medium">{instance.environmentLabel}</p>
                  <p className="text-xs text-muted-foreground">/disc/d/{instance.shareSlug}</p>
                </div>
                <div className="flex gap-2">
                  <CopyLinkButton path={`/disc/d/${instance.shareSlug}`} />
                  <Link
                    href={`/disc/equipes/${teamId}/${instance.id}`}
                    className="inline-flex h-8 items-center rounded-md border border-border px-3 text-sm hover:bg-accent/10"
                  >
                    Ver resultados
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
