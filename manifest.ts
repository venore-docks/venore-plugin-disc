import type { PluginManifest } from "@venore/plugin-sdk";

// Faixa escrita à mão, não importada de platform/plugin-engine/core-version.ts — mesmo motivo do
// academyManifest e do birthdaysManifest: importar o CORE_VERSION corrente tornaria a checagem de
// compatibilidade sempre trivialmente satisfeita.
//
// Sem `permissions`: diferente de academy/birthdays, este plugin não tem tela administrativa —
// times, instâncias e testes são todos self-service do usuário comum (mesmo espírito das rotas
// "public" de aluno da academy, gated só por auth() dentro da própria página/handler, nunca por
// RBAC). Ver routes/route-table.ts.
export const discManifest: PluginManifest = {
  manifestVersion: "1.0.0",
  key: "disc",
  name: "Teste DISC",
  version: "0.1.1",
  description:
    "Teste comportamental DISC — aplicação individual ou em equipe, com relatório visual e impressão em A4. Sucessor do NestPro.",
  compatibility: { coreVersion: ">=2.0.0 <3.0.0" },
  // Schema próprio do plugin — aplicado no install (run-plugin-migrations.ts), não no
  // vercel-build. Default de migrationsSchema ("disc_migrations") bate com drizzle.config.ts.
  migrationsPath: "./migrations",
};
