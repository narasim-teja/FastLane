import { homeRouter } from "./router/home";
import { wsRouter } from "./router/ws";
import { createRouter } from "./trpc";

export const appRouter = createRouter({
  "": homeRouter,
  ws: wsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
