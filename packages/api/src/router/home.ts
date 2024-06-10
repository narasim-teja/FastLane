import { publicProcedure } from "../trpc";

export const homeRouter = publicProcedure.query(
  () => "Hello from FastLane API! 🚀",
);
