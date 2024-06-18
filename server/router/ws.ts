import { observable } from "@trpc/server/observable";
import { z } from "zod";

import { revealRow } from "../helper";
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
        const obstacles = await revealRow(chainId, sessionId, rowIdx);
        ee.emit("revealRow", rowIdx, obstacles);
      }
    ),

  onRevealRow: publicProcedure.subscription(({ ctx: { ee } }) =>
    observable<{ rowIdx: number; obstacles: number[] }>((emit) => {
      const listener = (rowIdx: number, obstacles: number[]) => {
        emit.next({ rowIdx, obstacles });
      };

      ee.on("revealRow", listener);

      return () => {
        ee.off("revealRow", listener);
      };
    })
  ),
});
