CREATE TABLE IF NOT EXISTS "attachments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar NOT NULL,
	"url" varchar NOT NULL,
	"name" varchar NOT NULL,
	"size" integer NOT NULL,
	"type" varchar NOT NULL,
	"width" smallint NOT NULL,
	"height" smallint NOT NULL,
	"shout_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attachments" ADD CONSTRAINT "attachments_shout_id_shouts_id_fk" FOREIGN KEY ("shout_id") REFERENCES "public"."shouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_attachment_shout_id" ON "attachments" ("shout_id");