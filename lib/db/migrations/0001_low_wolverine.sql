ALTER TABLE "fastlane_wishlist" RENAME TO "fastlane_waitlist";--> statement-breakpoint
ALTER TABLE "fastlane_waitlist" DROP CONSTRAINT "fastlane_wishlist_email_unique";--> statement-breakpoint
ALTER TABLE "fastlane_waitlist" ADD CONSTRAINT "fastlane_waitlist_email_unique" UNIQUE("email");