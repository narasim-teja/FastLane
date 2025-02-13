import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const env = {
  // eslint-disable-next-line no-restricted-properties
  PRIVATE_KEY: process.env.PRIVATE_KEY || "", // Ensure type safety
  // eslint-disable-next-line no-restricted-properties
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || "",
};
