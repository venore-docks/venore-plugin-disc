ALTER TABLE "disc"."instances" ALTER COLUMN "created_by_user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "disc"."instances" ADD COLUMN "redirect_url" text;--> statement-breakpoint
ALTER TABLE "disc"."instances" ADD COLUMN "external_ref" text;