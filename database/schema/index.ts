import { jsonb, pgSchema, text, timestamp } from "drizzle-orm/pg-core";

export const discSchema = pgSchema("disc");

// createdByUserId/ownerUserId são texto solto, sem FK pra auth.users: um plugin não pode importar
// contexts/auth/database/schema (regra de isolamento de schema entre core e plugin — mesmo
// tratamento de birthdays.createdByUserId). Usuário apagado deixa o id órfão aqui.
export const discTeams = discSchema.table("teams", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ownerUserId: text("owner_user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const discTeamMembers = discSchema.table("team_members", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  teamId: text("team_id")
    .notNull()
    .references(() => discTeams.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  // "admin" | "member" — só controla o que a UI do time mostra (convidar, encerrar instância);
  // não é uma RBAC permission do core, é um dado de domínio do plugin.
  role: text("role").notNull().default("member"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Uma instância = "aplique o teste DISC para [ambiente]" com um link curto de convite. teamId
// nullable: instância pode ser pessoal (link que o próprio usuário gera pra si, sem time).
// environmentLabel é texto livre — pedido explícito da simplificação (era lookup fixo no NestPro).
export const discInstances = discSchema.table("instances", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  teamId: text("team_id").references(() => discTeams.id, { onDelete: "cascade" }),
  environmentLabel: text("environment_label").notNull().default("Geral"),
  shareSlug: text("share_slug").notNull().unique(),
  createdByUserId: text("created_by_user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Um relatório existe sozinho (teste avulso, sem time nem instância) ou preso a uma instância.
// userId fica nulo entre o fim do teste e o login (fluxo "faça o teste, logue só pra salvar") —
// features/claim-disc-report é quem preenche depois. dataset é o output verbatim de
// shared/disc-engine/score.ts: formato tem que continuar batendo com o histórico migrado do
// NestPro (ver scripts/migrate-nestpro-data.ts no core).
export const discReports = discSchema.table("reports", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id"),
  instanceId: text("instance_id").references(() => discInstances.id, { onDelete: "set null" }),
  environmentLabel: text("environment_label").notNull(),
  dataset: jsonb("dataset").notNull(),
  profileKey: text("profile_key").notNull(),
  profileKeySecondary: text("profile_key_secondary").notNull(),
  stress: text("stress").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
