import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "",
  client: {
    // ethers.js
    TEST_TRACK_OWNER_PKEY: z.string({
      required_error: "`TEST_TRACK_OWNER_PKEY` is required",
    }),

    // Oasis contract
    OASIS_CONTRACT_ADDRESS: z.string({
      required_error: "`OASIS_CONTRACT_ADDR` is required",
    }),

    // Production url
    SERVER_URL: z.string({
      required_error: "`SERVER_URL` is required",
    }),
  },

  runtimeEnvStrict: {
    TEST_TRACK_OWNER_PKEY: import.meta.env.VITE_TEST_TRACK_OWNER_PKEY as string,
    OASIS_CONTRACT_ADDRESS: import.meta.env
      .VITE_OASIS_CONTRACT_ADDRESS as string,
    SERVER_URL: import.meta.env.SERVER_URL as string,
  },
});
