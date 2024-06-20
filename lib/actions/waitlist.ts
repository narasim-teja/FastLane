"use server";

import pg from "postgres";

import type { waitlistSchema } from "../validations";
import type { z } from "zod";

import { db } from "../db";
import { waitlist } from "../db/schema";

type FormData = z.infer<typeof waitlistSchema>;

export async function addToWaitlistAction({ email }: FormData) {
  try {
    await db.insert(waitlist).values({ email }).execute();
  } catch (error) {
    if (error instanceof pg.PostgresError && error.code === "23505") {
      throw new Error("You're already on the waitlist!");
    }

    throw new Error("An error occurred while adding you to the waitlist.");
  }
}
