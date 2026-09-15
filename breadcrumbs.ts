import type { BreadcrumbSegmentDefinition } from "@venore/plugin-sdk";
import { staticBreadcrumbSegment } from "@venore/plugin-sdk";

export const discBreadcrumbSegments: BreadcrumbSegmentDefinition[] = [
  staticBreadcrumbSegment({ key: "disc.landing", segments: ["disc"], label: "Teste DISC" }),
  staticBreadcrumbSegment({ key: "disc.test", segments: ["disc", "teste"], label: "Fazer o teste" }),
  staticBreadcrumbSegment({ key: "disc.teams", segments: ["disc", "equipes"], label: "Minhas equipes" }),
];
