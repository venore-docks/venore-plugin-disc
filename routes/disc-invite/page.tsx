import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@venore/plugin-sdk/ui";
import { getDiscInstanceBySlug } from "../../index";

export const dynamic = "force-dynamic";

export default async function DiscInvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const instanceResult = await getDiscInstanceBySlug({ slug });
  if (!instanceResult.success) {
    notFound();
  }

  const { environmentLabel, teamName } = instanceResult.data;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Você foi convidado para o teste DISC</h1>
      <p className="text-sm text-muted-foreground">
        {teamName ? (
          <>
            A equipe <span className="font-medium text-foreground">{teamName}</span> pediu que você faça o teste
            considerando o ambiente <span className="font-medium text-foreground">{environmentLabel}</span>.
          </>
        ) : (
          <>
            Faça o teste considerando o ambiente <span className="font-medium text-foreground">{environmentLabel}</span>.
          </>
        )}
      </p>
      <Button asChild size="lg">
        <Link href={`/disc/teste?slug=${slug}`}>Começar o teste</Link>
      </Button>
    </div>
  );
}
