DO $$ BEGIN
 CREATE TYPE "public"."allowed_comment_enum" AS ENUM('everyone', 'none');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"shout_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"message" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"shout_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "uq_like_shoutId_userId" UNIQUE("shout_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shouts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"message" varchar NOT NULL,
	"user_id" text NOT NULL,
	"is_modified" boolean DEFAULT false NOT NULL,
	"is_anonymous" boolean DEFAULT false NOT NULL,
	"allowed_comment" "allowed_comment_enum" DEFAULT 'everyone' NOT NULL,
	"likes_count" integer DEFAULT 0 NOT NULL,
	"views_count" integer DEFAULT 0 NOT NULL,
	"comments_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_shout_id_shouts_id_fk" FOREIGN KEY ("shout_id") REFERENCES "public"."shouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_shout_id_shouts_id_fk" FOREIGN KEY ("shout_id") REFERENCES "public"."shouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_comment_shout_id" ON "comments" ("shout_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_comment_created_At" ON "comments" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_like_shout_id" ON "likes" ("shout_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_like_created_at" ON "likes" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_shout_user_id" ON "shouts" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_shout_created_at" ON "shouts" ("created_at");