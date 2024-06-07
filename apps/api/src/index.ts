import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Server } from "socket.io";

import { CHAIN_ID, SESSION_ID } from "./constants/globals";
import { env } from "./env";
import { revealRow } from "./helper";

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hell from FastLane API! 🚀");
});

const server = serve({ fetch: app.fetch, port: env.SOCKET_PORT }, (info) => {
  console.log(`Server is running: http://${info.address}:${info.port}`);
});

const ioServer = new Server(server, {
  cors: {
    origin: env.SOCKET_ORIGIN.split(","),
    methods: ["GET", "POST"],
  },
});

ioServer.on("connection", async (socket) => {
  console.log(`>>> New connection: ${socket.id}`);

  // automatically load and send the first row's obstacles upon new connection
  try {
    console.log("Loading initial obstacles...");

    const obstaclesForRowZero = await revealRow(CHAIN_ID, SESSION_ID, 0);

    socket.emit("client.revealRow", 0, obstaclesForRowZero);
  } catch (error) {
    console.error("Failed to load initial obstacles:", error);
  }

  socket.on("server.revealRow", async (chainId, sessionId, rowIndex) => {
    console.log(
      `Reveal row: sessionId=${sessionId}, rowIndex=${rowIndex}, chainId=${chainId}`,
    );

    try {
      const obstaclesInRow = await revealRow(chainId, sessionId, rowIndex);

      socket.emit("client.revealRow", rowIndex, obstaclesInRow);
    } catch (error) {
      console.error("Error in revealRow:", error);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`<<< Disconnected: ${socket.id} (${reason})`);
  });
});
