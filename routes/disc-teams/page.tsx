import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@venore/plugin-sdk/auth";
import { Card, CardContent, CardHeader, CardTitle, EmptyState } from "@venore/plugin-sdk/ui";
import { listMyDiscTeams } from "../../index";
import { CreateDiscTeamForm } from "./create-team-form";

export const dynamic = "force-dynamic";

export default async function DiscTeamsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser.success || !currentUser.data) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent("/disc/equipes")}`);
  }

  const teamsResult = await listMyDiscTeams();
  const teams = teamsResult.success ? teamsResult.data : [];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Minhas equipes</h1>
        <p className="text-sm text-muted-foreground">Crie uma equipe para gerar links de teste DISC e acompanhar os resultados.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nova equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateDiscTeamForm />
        </CardContent>
      </Card>

      {teams.length === 0 ? (
        <EmptyState title="Nenhuma equipe ainda" description="Crie a primeira equipe acima para começar a aplicar o teste." />
      ) : (
        <div className="flex flex-col gap-3">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/disc/equipes/${team.id}`}
              className="rounded-panel border border-border bg-card p-4 transition-colors hover:bg-accent/10"
            >
              <p className="font-medium">{team.name}</p>
              {team.description && <p className="text-sm text-muted-foreground">{team.description}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
