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
      .default("8080"),

    SERVER_URL: z.string().optional().default("http://localhost:8080"),
  },

  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    /* -----------------------------------------------------------------------------------------------
     * ethers.js
     * -----------------------------------------------------------------------------------------------*/

    TEST_TRACK_OWNER_PKEY: z.string({
      required_error: "`TEST_TRACK_OWNER_PKEY` is required",
    }),

    /* -----------------------------------------------------------------------------------------------
     * Oasis contract
     * -----------------------------------------------------------------------------------------------*/
    OASIS_CONTRACT_ADDRESS: z.string({
      required_error: "`OASIS_CONTRACT_ADDR` is required",
    }),

    THIRDWEB_SECRET_KEY: z.string({
      required_error: "`THIRDWEB_SECRET_KEY` is required",
    }),
    THIRDWEB_ADMIN_PRIVATE_KEY: z.string({
      required_error: "`THIRDWEB_ADMIN_PRIVATE_KEY` is required",
    }),

    /* -----------------------------------------------------------------------------------------------
     * Postgres Database URL (Supabase)
     * -----------------------------------------------------------------------------------------------*/

    DATABASE_URL: z.string({
      required_error: "`DATABASE_URL` is required",
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
     * Thirdweb (https://thirdweb.com/create-api-key)
     * -----------------------------------------------------------------------------------------------*/

    NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN: z.string({
      required_error: "`NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN` is required",
    }),
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string({
      required_error: "`NEXT_PUBLIC_THIRDWEB_CLIENT_ID` is required",
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
    SERVER_URL: process.env.SERVER_URL,
    NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN,
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
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
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
