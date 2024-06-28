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
        const obstacles = await revealObstaclesInRow(
          chainId,
          sessionId,
          rowIdx
        );
        ee.emit("revealRow", { rowIdx, obstacles });
      }
    ),

  onRevealRow: publicProcedure.subscription(({ ctx: { ee } }) =>
    observable<RevealRowData>((emit) => {
      logger(">>>> observer running <<<<");

      const listener = ({ rowIdx, obstacles }: RevealRowData) => {
        emit.next({ rowIdx, obstacles });
      };

      ee.on("revealRow", listener);

      return () => {
        ee.off("revealRow", listener);
      };
    })
  ),
});
