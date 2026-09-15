"use client";

import { Printer } from "lucide-react";
import { Button } from "@venore/plugin-sdk/ui";

// Sem aviso de "ative gráficos em segundo plano" — o gráfico de superfície agora é um <svg> real
// no DOM (ver charts/disc-surface-chart.tsx), não um CSS background-image, então imprime sem
// depender de nenhuma opção do navegador.
export function DiscReportPrintButton() {
  return (
    <Button variant="outline" size="sm" className="gap-2 print:hidden" onClick={() => window.print()}>
      <Printer className="h-4 w-4" /> Imprimir
    </Button>
  );
}
