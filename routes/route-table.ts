import { asPluginPage, type PluginRouteTable } from "@venore/plugin-sdk";
import DiscLandingPage from "./disc-landing/page";
import DiscTestPage from "./disc-test/page";
import DiscReportPage from "./disc-report/page";
import DiscTeamsPage from "./disc-teams/page";
import DiscTeamDetailPage from "./disc-team-detail/page";
import DiscInstanceResultsPage from "./disc-instance-results/page";
import DiscInvitePage from "./disc-invite/page";
import DiscMyResultsPage from "./my-results/page";

// Todas as rotas são "public" (renderizadas com a shell normal do tema, catch-all do CMS) mesmo
// as que exigem login — auth() é checado dentro de cada page.tsx, não por uma área "admin" à
// parte (mesmo padrão de venore-plugin-academy pras rotas de aluno). Não há rota "admin": este
// plugin não tem tela de administração do site, só self-service do usuário comum.
export const discRouteTable: PluginRouteTable = {
  public: [
    { pattern: "disc", Component: asPluginPage(DiscLandingPage) },
    { pattern: "disc/teste", Component: asPluginPage(DiscTestPage) },
    { pattern: "disc/r/:reportId", Component: asPluginPage(DiscReportPage) },
    { pattern: "disc/meus-resultados", Component: asPluginPage(DiscMyResultsPage) },
    { pattern: "disc/equipes", Component: asPluginPage(DiscTeamsPage) },
    { pattern: "disc/equipes/:teamId", Component: asPluginPage(DiscTeamDetailPage) },
    { pattern: "disc/equipes/:teamId/:instanceId", Component: asPluginPage(DiscInstanceResultsPage) },
    { pattern: "disc/d/:slug", Component: asPluginPage(DiscInvitePage) },
  ],
};
