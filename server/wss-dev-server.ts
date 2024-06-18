import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";

import { env } from "~/lib/env";

import { appRouter } from "./router";
import { createContext } from "./trpc";

const wss = new WebSocketServer({ port: 3001 });

const handler = applyWSSHandler({ wss, router: appRouter, createContext });

wss.on("connection", (ws) => {
  console.log(`>>> Connection (${wss.clients.size})`);

  ws.once("close", () => {
    console.log(`<<< Connection (${wss.clients.size})`);
  });
});

console.log(`✅ WebSocket Server listening on ${env.NEXT_PUBLIC_WS_URL}`);

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
