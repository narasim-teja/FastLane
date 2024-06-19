/* -----------------------------------------------------------------------------------------------
 * NOTE:
 *
 * currently facing an issue where events are not triggering (either emitting
 * or listening or both) from next.js router handlers.
 * As a result, I have moved to a standalone WebSocket server.
 * This setup might change in the future if a possible solution is found.
 * -----------------------------------------------------------------------------------------------*/

import { type NextRequest } from "next/server";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { env } from "~/lib/env";
import { appRouter } from "~/server/router";
import { createContext } from "~/server/trpc";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext({ headers: req.headers }),
    onError:
      env.NODE_ENV === "development" ?
        ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
  });

export { handler as GET, handler as POST };
