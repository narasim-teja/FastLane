import { tracked } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { fromHex } from "viem";
import { z } from "zod";

import type { RevealRowData, UpdateCheckpointData } from "~/types/ws";

import { getLogger } from "~/lib/logger";
import { fetchGraphQLData } from "~/utils/api";
import { NOTICES_QUERY } from "~/utils/queries";

import {
  convertFlatArrayTo2DArray,
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
const cartesiObstacleData: number[][] = [];

const authSchema = z.object({
  user: z.string(),
  time: z.number(),
  rsv: z.object({
    r: z.string(),
    s: z.string(),
    v: z.number(),
  }),
});

export const singlePlayerRouter = createRouter({
  revealRow: protectedProcedure
    .input(
      z.discriminatedUnion("track", [
        z.object({
          track: z.literal("eth"),
          rowIdx: z.number(),
          auth: authSchema,
        }),
        z.object({
          track: z.literal("gold"),
          rowIdx: z.number(),
          auth: authSchema.optional(),
        }),
      ])
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
        if (cartesiObstacleData.length === 0) {
          try {
            const data = await fetchGraphQLData<{
              notices: { edges: { node: { payload: string } }[] };
            }>(NOTICES_QUERY);

            const lastNotice =
              data.notices.edges[data.notices.edges.length - 1]?.node;

            if (lastNotice) {
              const payload = fromHex(
                lastNotice.payload as `0x${string}`,
                "bytes"
              );
              cartesiObstacleData.push(
                ...convertFlatArrayTo2DArray(payload, 50, 5)
              );
            }
          } catch (error) {
            console.error("Failed to fetch Cartesi data:", error);
            // Fallback to random data if Cartesi fetch fails
            obstacles = obstacleData.at(rowIdx) ?? [];
            rowCount = obstacleData.length;
            return { rowIdx, rowCount, obstacles };
          }
        }

        obstacles = cartesiObstacleData.at(rowIdx) ?? [];
        rowCount = cartesiObstacleData.length;
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
        auth: authSchema,
      })
    )
    .mutation(async ({ input: { auth } }) => {
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
    .input(z.object({ address: z.string(), checkpointNumber: z.number() }))
    .mutation(async ({ ctx: { ee }, input: { address, checkpointNumber } }) => {
      await updateCheckpoint(address, checkpointNumber);

      ee.emit("updateCheckpoint", { checkpointNumber });
    }),
});
