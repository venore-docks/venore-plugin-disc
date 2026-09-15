import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@venore/plugin-sdk/ui";
import { DISC_HOWTO } from "../../shared/disc-engine/questions";

export const dynamic = "force-dynamic";

// Ponto de entrada simplificado do plugin — pedido explícito da migração: "acessa o NestPro,
// clica num botão, já faz o teste sem muita complicação". Sem login aqui; login só entra na hora
// de salvar o resultado (ver routes/disc-report/page.tsx).
export default function DiscLandingPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Teste DISC</h1>
        <p className="text-sm text-muted-foreground">
          Descubra seu perfil comportamental em poucos minutos. Não precisa criar conta pra fazer o
          teste — só pra salvar o resultado depois.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/disc/teste">Fazer o teste agora</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/disc/equipes">Aplicar em uma equipe</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{DISC_HOWTO.title}</CardTitle>
        </CardHeader>
        <CardContent
          className="space-y-3 text-sm text-muted-foreground [&_span]:font-medium [&_span]:text-foreground"
          dangerouslySetInnerHTML={{ __html: DISC_HOWTO.content }}
        />
      </Card>
    </div>
  );
}
