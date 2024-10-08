import { tracked } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import type { RevealRowData } from "~/types/ws";

import { CHAIN_ID, SESSION_ID } from "~/config/constants";
import { getLogger } from "~/lib/logger";

import { fetchAllObstacles, revealObstaclesInRow } from "../helper";
import { createRouter, protectedProcedure } from "../trpc";

import { useWriteInputBoxAddInput } from "../hooks/generated";


const logger = getLogger();

const { isPending, isSuccess, error, writeContractAsync } = useWriteInputBoxAddInput();

const dAppAddress = `0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e`; // Default address for running locally change upon deployment

// {"method":"generate_random","rows":5,"cols":5,"max":4}
// converted json to hex change when adding more obstacles
// 0x7b226d6574686f64223a2267656e65726174655f72616e646f6d222c22726f7773223a352c22636f6c73223a352c226d6178223a347d

const hexPayload = '0x7b226d6574686f64223a2267656e65726174655f72616e646f6d222c22726f7773223a352c22636f6c73223a352c226d6178223a347d';

// async function generateRandomObstacleData(){
//   await writeContractAsync({
//     args: [
//       dAppAddress,
//       hexPayload,
//     ],
//   });

// }

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
        chainId: z.number(),
        sessionId: z.number(),
        rowIdx: z.number(),
      })
    )
    .mutation(
      async ({ ctx: { ee }, input: { track, chainId, sessionId, rowIdx } }) => {
        let rowCount: number, obstacles: number[];

        if (track === "eth") {
          ({ obstaclesInRow: obstacles, rowCount } = await revealObstaclesInRow(
            chainId,
            sessionId,
            rowIdx
          ));
        } else {
          obstacles = obstacleData.at(rowIdx) ?? [];
          rowCount = obstacleData.length;
        }

        ee.emit("revealRow", { rowIdx, rowCount, obstacles });

        return { rowIdx, rowCount, obstacles };
      }
    ),

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

  updateObstacles: protectedProcedure.mutation(async ({ ctx: { ee } }) => {
    // 12 sec delay to allow for the blockchain to update
    await new Promise((resolve) => setTimeout(resolve, 12000));

    const { rowCount, obstacles } = await fetchAllObstacles(
      CHAIN_ID,
      SESSION_ID
    );

    logger.info({ rowCount, obstacles }, "Full available obstacles:");

    ee.emit("revealRow", { rowIdx: -1, rowCount, obstacles });

    return {
      rowCount,
      obstacles,
      refresh: true,
    };
  }),
});
