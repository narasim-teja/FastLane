import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import cors from "cors";
import { WebSocketServer } from "ws";

import { env } from "~/lib/env";

import { appRouter } from "./router";
import { createContext } from "./trpc";

export const server = createHTTPServer({
  router: appRouter,
  createContext: (opts) => createContext({ headers: opts.req.headers }),
  middleware: cors(),
}).listen(env.PORT);

export const wss = new WebSocketServer({ server });

const handler = applyWSSHandler({ wss, router: appRouter, createContext });

wss
  .on("listening", () => {
    console.log(
      "✅ WebSocket Server listening on",
      env.SERVER_URL.replace(/https?/, "ws")
    );
  })
  .on("connection", (ws) => {
    console.log(`>>> Connection (${wss.clients.size})`);

    ws.once("close", () => {
      console.log(`<<< Connection (${wss.clients.size})`);
    });
  });

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
