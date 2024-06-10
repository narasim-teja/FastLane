import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import cors from "cors";
import { WebSocketServer } from "ws";

import { appRouter, createContext } from "@fastlane/api";

import { env } from "./lib/env";

export const server = createHTTPServer({
  router: appRouter,
  createContext,
  middleware: cors({ origin: env.ORIGIN }),
}).listen(env.PORT, () => {
  console.log(`>>> HTTP Server is running PORT=${env.PORT}`);
});

export const wss = new WebSocketServer({ server });

const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext,
});

wss
  .on("listening", () => {
    console.log(">>> WebSocket Server is running on ws://localhost:3000");
  })
  .on("connection", (ws) => {
    console.log(`>>> ++ Connection (${wss.clients.size})`);
    ws.once("close", () => {
      console.log(`>>> -- Connection (${wss.clients.size})`);
    });
  });

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
