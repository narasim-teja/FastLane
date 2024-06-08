import { z } from "zod";

export const envSchema = z
  .object({
    DEV: z.boolean().default(true),

    // ethers.js
    VITE_TEST_TRACK_OWNER_PKEY: z.string({
      required_error: "`TEST_TRACK_OWNER_PKEY` is required",
    }),

    // Oasis contract
    VITE_OASIS_CONTRACT_ADDRESS: z.string({
      required_error: "`OASIS_CONTRACT_ADDR` is required",
    }),
  })
  .transform((data) => ({
    ...data,
    TRACK_OWNER_PKEY: data.VITE_TEST_TRACK_OWNER_PKEY,
    OASIS_CONTRACT_ADDRESS: data.VITE_OASIS_CONTRACT_ADDRESS,
  }));

export type Env = z.infer<typeof envSchema>;

export let env: Env;

try {
  env = envSchema.parse(import.meta.env);
} catch (error) {
  console.log(">>> Failed to parse environment variables:");
  console.log(
    `${(error as z.ZodError).errors.map((e) => e.message).join("\n")}`,
  );

  // force exit
  // process.exit(1);
}
