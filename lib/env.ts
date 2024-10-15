/* eslint-disable no-restricted-properties */

import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  shared: {
    /* -----------------------------------------------------------------------------------------------
     * Node.js Environment
     * -----------------------------------------------------------------------------------------------*/

    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    PORT: z
      .string()
      .transform((v) => +v)
      .optional()
      .default("3000"),
  },

  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    /* -----------------------------------------------------------------------------------------------
     * ethers.js
     * -----------------------------------------------------------------------------------------------*/

    TRACK_OWNER_PKEY: z.string({
      required_error: "`TRACK_OWNER_PKEY` is required",
    }),

    /* -----------------------------------------------------------------------------------------------
     * Oasis contract
     * -----------------------------------------------------------------------------------------------*/
    OASIS_CONTRACT_ADDRESS: z.string({
      required_error: "`OASIS_CONTRACT_ADDRESS` is required",
    }),

    /* -----------------------------------------------------------------------------------------------
     * Dynamic Wallet
     * -----------------------------------------------------------------------------------------------*/

    DYNAMIC_ENVIRONMENT_ID: z.string({
      required_error: "`DYNAMIC_ENVIRONMENT_ID` is required",
    }),
    DYNAMIC_API_BASE_URL: z.string({
      required_error: "`DYNAMIC_API_BASE_URL` is required",
    }),

    /* -----------------------------------------------------------------------------------------------
     * Postgres Database URL (Supabase)
     * -----------------------------------------------------------------------------------------------*/

    DATABASE_URL: z.string({
      required_error: "`DATABASE_URL` is required",
    }),

    /* -----------------------------------------------------------------------------------------------
     * Resend
     * -----------------------------------------------------------------------------------------------*/
    RESEND_API_KEY: z.string({
      required_error: "`RESEND_API_KEY` is required",
    }),

    /* -----------------------------------------------------------------------------------------------
     * Umami Analytics
     * -----------------------------------------------------------------------------------------------*/
    UMAMI_WEBSITE_ID: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    /* -----------------------------------------------------------------------------------------------
     * Oasis contract
     * -----------------------------------------------------------------------------------------------*/
    NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS: z.string({
      required_error: "`OASIS_CONTRACT_ADDR` is required",
    }),

    /* -----------------------------------------------------------------------------------------------
     * Dynamic Wallet
     * -----------------------------------------------------------------------------------------------*/
    NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID: z.string({
      required_error: "`NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` is required",
    }),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   * For Next.js >= 13.4.4, you only need to destructure client variables (Only valid for `experimental__runtimeEnv`)
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS,
    NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID:
      process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
  },

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation:
    !!process.env.CI ||
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.npm_lifecycle_event === "lint",
});
