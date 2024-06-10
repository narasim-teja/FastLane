import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
import { z } from "zod";

config();

export const env = createEnv({
  emptyStringAsUndefined: true,

  server: {
    // web server
    PORT: z
      .string()
      .transform((v) => +v)
      .optional()
      .default("3000"),
    ORIGIN: z
      .string()
      .transform((v) => v.split(","))
      .optional()
      .default("http://localhost:3000"), // ethers.js
    TEST_TRACK_OWNER_PKEY: z.string({
      required_error: "`TEST_TRACK_OWNER_PKEY` is required",
    }),

    // Oasis contract
    OASIS_CONTRACT_ADDRESS: z.string({
      required_error: "`OASIS_CONTRACT_ADDR` is required",
    }),
  },
  runtimeEnvStrict: {
    PORT: process.env.PORT,
    ORIGIN: process.env.ORIGIN,
    TEST_TRACK_OWNER_PKEY: process.env.TEST_TRACK_OWNER_PKEY,
    OASIS_CONTRACT_ADDRESS: process.env.OASIS_CONTRACT_ADDRESS,
  },
});
