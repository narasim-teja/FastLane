/* -----------------------------------------------------------------------------------------------
 * NOTE:
 *
 * currently facing an issue where events are not triggering (either emitting
 * or listening or both) from next.js router handlers.
 * As a result, I have moved to a standalone WebSocket server.
 * This setup might change in the future if a possible solution is found.
 * -----------------------------------------------------------------------------------------------*/

import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";

import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";

import { env } from "~/lib/env";

import { appRouter } from "./router";
import { createContext } from "./trpc";

const PORT = env.PORT;
const dev = env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    if (!req.url) return;

    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ server });

  const handler = applyWSSHandler({ wss, router: appRouter, createContext });

  process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
  });

  server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });

  // Keep the next.js upgrade handler from being added to our custom server
  // so sockets stay open even when not HMR.
  const originalOn = server.on.bind(server);
  server.on = function (event, listener) {
    return event !== "upgrade" ? originalOn(event, listener) : server;
  };

  server.listen(PORT);

  console.log(
    `>>> Server listening at http://localhost:${PORT} as ${
      dev ? "development" : env.NODE_ENV
    }`
  );
});
