import { on } from "events";

import { tracked } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import type { RevealRowData } from "~/types/ws";

import { CHAIN_ID, SESSION_ID } from "~/config/constants";
import { getLogger } from "~/lib/logger";

import { fetchAllObstacles, revealObstaclesInRow } from "../helper";
import { createRouter, publicProcedure } from "../trpc";

const logger = getLogger();

export const wsRouter = createRouter({
  revealRow: publicProcedure
    .input(
      z.object({
        chainId: z.number(),
        sessionId: z.number(),
        rowIdx: z.number(),
      })
    )
    .mutation(
      async ({ ctx: { ee }, input: { chainId, sessionId, rowIdx } }) => {
        const { obstaclesInRow: obstacles, rowCount } =
          await revealObstaclesInRow(chainId, sessionId, rowIdx);

        ee.emit("revealRow", { rowIdx, rowCount, obstacles });
      }
    ),

  onRevealRow: publicProcedure.subscription(async function* ({ ctx: { ee } }) {
    logger.info(">>>> observer running <<<<");

    for await (const [data] of on(ee, "revealRow")) {
      const revealRowData = data as RevealRowData;

      yield tracked(revealRowData.rowIdx.toString(), revealRowData);
    }
  }),

  /**
   * @deprecated
   * This subscription does not work in Next.js v14 with `fetchRequestHandler`.
   * Please use `onRevealRow` instead.
   */
  _onRevealRow: publicProcedure.subscription(({ ctx: { ee } }) =>
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

  updateObstacles: publicProcedure.mutation(async ({ ctx: { ee } }) => {
    // 5 sec delay to allow for the blockchain to update
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
