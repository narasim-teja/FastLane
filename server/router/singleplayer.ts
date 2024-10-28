import { tracked } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import type { RevealRowData, UpdateCheckpointData } from "~/types/ws";

import { getLogger } from "~/lib/logger";

import {
  fetchAllObstacles,
  revealObstaclesInRow,
  updateCheckpoint,
} from "../helper";
import { createRouter, protectedProcedure } from "../trpc";

const logger = getLogger();
function generateRandomObstacleData(): number[][] {
  const numRows = Math.floor(Math.random() * (50 - 10 + 1)) + 10; // Random length between 10 and 50
  const numCols = 5; // Fixed number of columns per row

  const random2DArray: number[][] = Array.from({ length: numRows }, () => {
    const row = new Array(numCols).fill(0); // Initialize a row of zeros
    const randomIndex = Math.floor(Math.random() * numCols); // Random index for non-zero element
    const randomValue = Math.floor(Math.random() * 4) + 1; // Random value between 1 and 4
    row[randomIndex] = randomValue;
    return row;
  });

  return random2DArray;
}

const obstacleData = generateRandomObstacleData();

export const singlePlayerRouter = createRouter({
  revealRow: protectedProcedure
    .input(
      z.object({
        track: z.enum(["eth", "gold"]),
        rowIdx: z.number(),
        auth: z.object({
          user: z.string(),
          time: z.number(),
          rsv: z.object({
            r: z.string(),
            s: z.string(),
            v: z.number(),
          }),
        }),
      })
    )
    .mutation(async ({ ctx: { ee }, input: { track, rowIdx, auth } }) => {
      console.log("revealRow called with:", { track, rowIdx, auth });
      let rowCount: number, obstacles: number[];

      if (track === "eth") {
        console.log("Calling revealObstaclesInRow for ETH track");
        ({ obstaclesInRow: obstacles, rowCount } = await revealObstaclesInRow(
          rowIdx,
          auth
        ));
      } else {
        console.log("Using generated obstacle data for non-ETH track");
        obstacles = obstacleData.at(rowIdx) ?? [];
        rowCount = obstacleData.length;
      }

      console.log("Revealed row data:", { rowIdx, rowCount, obstacles });
      ee.emit("revealRow", { rowIdx, rowCount, obstacles });

      return { rowIdx, rowCount, obstacles };
    }),

  onRevealRow: protectedProcedure.subscription(async function* ({
    ctx: { ee },
  }) {
    logger.info(">>>> observer running <<<<");

    for await (const [data] of ee.toIterable("revealRow")) {
      const revealRowData = data as RevealRowData;

      yield tracked(revealRowData.rowIdx.toString(), revealRowData);
    }
  }),

  /**
   * @deprecated
   * This subscription does not work in Next.js v14 with `fetchRequestHandler`.
   * Please use `onRevealRow` instead.
   */
  _onRevealRow: protectedProcedure.subscription(({ ctx: { ee } }) =>
    observable<RevealRowData>((emit) => {
      logger.info(">>>> observer running <<<<");

      const listener = (props: RevealRowData) => {
        emit.next(props);
      };

      ee.on("revealRow", listener);

      return () => {
        ee.off("revealRow", listener);
      };
    })
  ),

  onUpdateCheckpoint: protectedProcedure.subscription(async function* ({
    ctx: { ee },
  }) {
    for await (const [data] of ee.toIterable("updateCheckpoint")) {
      const updateCheckpointData = data as UpdateCheckpointData;
      yield tracked(
        updateCheckpointData.checkpointNumber.toString(),
        updateCheckpointData
      );
    }
  }),

  updateObstacles: protectedProcedure
    .input(
      z.object({
        auth: z.object({
          user: z.string(),
          time: z.number(),
          rsv: z.object({
            r: z.string(),
            s: z.string(),
            v: z.number(),
          }),
        }),
      })
    )
    .mutation(async ({ ctx: { ee }, input: { auth } }) => {
      console.log("updateObstacles called with auth:", auth);
      // 15 sec delay to allow for the blockchain to update
      await new Promise((resolve) => setTimeout(resolve, 15000));

      // console.log("Fetching all obstacles");
      // const { rowCount, obstacles } = await fetchAllObstacles(auth);

      // logger.info({ rowCount, obstacles }, "Full available obstacles:");

      // ee.emit("revealRow", { rowIdx: -1, rowCount, obstacles });

      return {
        refresh: true,
      };
    }),

  updateCheckpoint: protectedProcedure
    .input(
      z.object({
        address: z.string(),
        checkpointNumber: z.number(),
      })
    )
    .mutation(async ({ ctx: { ee }, input: { address, checkpointNumber } }) => {
      await updateCheckpoint(address, checkpointNumber);

      ee.emit("updateCheckpoint", { checkpointNumber });
    }),
});
