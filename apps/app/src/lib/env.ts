import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",

  client: {
    // ethers.js
    VITE_TEST_TRACK_OWNER_PKEY: z.string({
      required_error: "`TEST_TRACK_OWNER_PKEY` is required",
    }),

    // Oasis contract
    VITE_OASIS_CONTRACT_ADDRESS: z.string({
      required_error: "`OASIS_CONTRACT_ADDR` is required",
    }),

    // Production url
    VITE_BACKEND_URL: z.string({
      required_error: "`BACKEND_URL` is required",
    }),
  },

  runtimeEnvStrict: {
    VITE_TEST_TRACK_OWNER_PKEY: import.meta.env
      .VITE_TEST_TRACK_OWNER_PKEY as string,
    VITE_OASIS_CONTRACT_ADDRESS: import.meta.env
      .VITE_OASIS_CONTRACT_ADDRESS as string,
    VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL as string,
  },
});
