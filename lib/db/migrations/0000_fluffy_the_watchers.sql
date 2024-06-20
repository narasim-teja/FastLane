CREATE TABLE IF NOT EXISTS "fastlane_wishlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	CONSTRAINT "fastlane_wishlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "fastlane_wishlist" USING btree ("email");