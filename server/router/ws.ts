import { on } from "events";

import { sse } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import type { RevealRowData } from "~/types/ws";

import { logger } from "~/lib/utils";

import { revealObstaclesInRow } from "../helper";
import { createRouter, publicProcedure } from "../trpc";

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
    console.log(">>>> observer running <<<<");

    for await (const [data] of on(ee, "revealRow")) {
      const revealRowData = data as RevealRowData;

      yield sse({
        id: revealRowData.rowIdx.toString(),
        data: revealRowData,
      });
    }
  }),

  /**
   * @deprecated
   * This subscription does not work in Next.js v14 with `fetchRequestHandler`.
   * Please use `onRevealRow` instead.
   */
  _onRevealRow: publicProcedure.subscription(({ ctx: { ee } }) =>
    observable<RevealRowData>((emit) => {
      logger(">>>> observer running <<<<");

      const listener = (props: RevealRowData) => {
        emit.next(props);
      };

      ee.on("revealRow", listener);

      return () => {
        ee.off("revealRow", listener);
      };
    })
  ),
});
