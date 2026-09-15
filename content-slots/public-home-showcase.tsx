import Link from "next/link";
import { Button } from "@venore/plugin-sdk/ui";

// Vitrine da home pública quando não há entry "home" no CMS — é o ponto de entrada simplificado
// pedido: "acessa o NestPro, clica num botão, já faz o teste sem muita complicação". Sem
// isPluginActive aqui: quem itera publicHomeShowcase (o core) já só chama plugins ativos.
export function renderDiscPublicHomeShowcase() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-panel border border-border bg-card p-8 text-center shadow-panel">
      <h2 className="text-2xl font-semibold tracking-tight">Descubra seu perfil comportamental</h2>
      <p className="text-sm text-muted-foreground">
        O teste DISC leva poucos minutos e mostra como você se comporta — sozinho ou com sua equipe.
      </p>
      <Button asChild size="lg">
        <Link href="/disc">Fazer o teste DISC</Link>
      </Button>
    </section>
  );
}
