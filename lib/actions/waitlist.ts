"use server";

import pg from "postgres";

import type { waitlistSchema } from "../validations";
import type { z } from "zod";

import { siteConfig } from "~/config/site";
import { WaitlistEmail } from "~/emails/waitlist-email";

import { db } from "../db";
import { waitlist } from "../db/schema";
import { resend } from "../resend";

type FormData = z.infer<typeof waitlistSchema>;

export async function addToWaitlistAction({ email }: FormData) {
  try {
    const [dbRes] = await db.insert(waitlist).values({ email }).returning();

    if (dbRes.email) {
      const { error } = await resend.emails.send({
        from: `${siteConfig.name} <${siteConfig.email}>`,
        to: [email],
        subject: "Thank you for joining our waitlist! 🎉",
        react: WaitlistEmail({ email }),
      });

      if (error) {
        console.error(`Failed to send email to ${email}: ${error.message}`);
      }
    }
  } catch (error) {
    if (error instanceof pg.PostgresError && error.code === "23505") {
      throw new Error("You're already on the waitlist!");
    }

    throw new Error("An error occurred while adding you to the waitlist.");
  }
}
