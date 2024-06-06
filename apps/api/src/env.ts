import { config } from "dotenv";
import { z } from "zod";

config({ path: "../../.env" });

export const envSchema = z.object({
  // socket.io
  SOCKET_PORT: z
    .string({ required_error: "`SOCKET_PORT` is required" })
    .transform((v) => +v)
    .default("3000"),
  SOCKET_PATH: z.string().default("/socket.io"),
  SOCKET_ORIGIN: z.string().default("http://localhost:5173"),

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
