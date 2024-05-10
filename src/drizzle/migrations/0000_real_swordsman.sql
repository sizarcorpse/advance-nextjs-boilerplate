CREATE TABLE IF NOT EXISTS "comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"shoutId" uuid NOT NULL,
	"userId" text NOT NULL,
	"message" varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "like" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"shoutId" uuid NOT NULL,
	"userId" text NOT NULL,
	CONSTRAINT "like_shoutId_userId_unique" UNIQUE("shoutId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shout" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"message" varchar(500) NOT NULL,
	"userId" text NOT NULL,
	"isModified" boolean DEFAULT false NOT NULL,
	"isAnonymous" boolean DEFAULT false NOT NULL,
	"allowedComment" boolean DEFAULT true NOT NULL,
	"likesCount" integer DEFAULT 0 NOT NULL,
	"viewsCount" integer DEFAULT 0 NOT NULL,
	"commentsCount" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comment_createdAt_index" ON "comment" ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "like_createdAt_index" ON "like" ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "shout_userId_index" ON "shout" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "shout_createdAt_index" ON "shout" ("createdAt");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_shoutId_shout_id_fk" FOREIGN KEY ("shoutId") REFERENCES "shout"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "like" ADD CONSTRAINT "like_shoutId_shout_id_fk" FOREIGN KEY ("shoutId") REFERENCES "shout"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
