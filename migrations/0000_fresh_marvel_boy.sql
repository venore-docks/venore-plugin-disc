CREATE SCHEMA "disc";
--> statement-breakpoint
CREATE TABLE "disc"."instances" (
	"id" text PRIMARY KEY NOT NULL,
	"team_id" text,
	"environment_label" text DEFAULT 'Geral' NOT NULL,
	"share_slug" text NOT NULL,
	"created_by_user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "instances_share_slug_unique" UNIQUE("share_slug")
);
--> statement-breakpoint
CREATE TABLE "disc"."reports" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"instance_id" text,
	"environment_label" text NOT NULL,
	"dataset" jsonb NOT NULL,
	"profile_key" text NOT NULL,
	"profile_key_secondary" text NOT NULL,
	"stress" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "disc"."team_members" (
	"id" text PRIMARY KEY NOT NULL,
	"team_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "disc"."teams" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "disc"."instances" ADD CONSTRAINT "instances_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "disc"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disc"."reports" ADD CONSTRAINT "reports_instance_id_instances_id_fk" FOREIGN KEY ("instance_id") REFERENCES "disc"."instances"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disc"."team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "disc"."teams"("id") ON DELETE cascade ON UPDATE no action;