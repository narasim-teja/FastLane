import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});
