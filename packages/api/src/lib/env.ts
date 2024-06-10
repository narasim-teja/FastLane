import { config } from "dotenv";
import { z } from "zod";

config();

export const envSchema = z.object({
  // ethers.js
  TEST_TRACK_OWNER_PKEY: z.string({
    required_error: "`TEST_TRACK_OWNER_PKEY` is required",
  }),

  // Oasis contract
  OASIS_CONTRACT_ADDRESS: z.string({
    required_error: "`OASIS_CONTRACT_ADDR` is required",
  }),
});

export type Env = z.infer<typeof envSchema>;

export let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  console.log(">>> Failed to parse environment variables:");
  console.log(
    `${(error as z.ZodError).errors.map((e) => e.message).join("\n")}`,
  );

  process.exit(1);
}
