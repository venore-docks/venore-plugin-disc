import type { PluginContributions } from "@venore/plugin-sdk";
import { discBreadcrumbSegments } from "./breadcrumbs";

// userNavItems/publicHomeShowcase usam componente que sobe até auth/ui, então import()
// preguiçoso — mesmo padrão de venore-plugin-academy/contributions.ts.
export const discContributions: PluginContributions = {
  breadcrumbSegments: discBreadcrumbSegments,
  userNavItems: async () => [
    { key: "disc.my-results", label: "Meus resultados DISC", href: "/disc/meus-resultados", icon: "clipboard-list" },
    { key: "disc.teams", label: "Minhas equipes DISC", href: "/disc/equipes", icon: "users" },
  ],
  publicHomeShowcase: async () => {
    const { renderDiscPublicHomeShowcase } = await import("./content-slots/public-home-showcase");
    return renderDiscPublicHomeShowcase();
  },
};
