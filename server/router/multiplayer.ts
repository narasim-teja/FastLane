import { tracked } from "@trpc/server";
import { z } from "zod";

import type { Coordinates } from "~/types/misc";
import type { BroadcastPositionData } from "~/types/ws";

import { createRouter, protectedProcedure } from "../trpc";

const totalPlayers = new Map<
  string,
  { position: Coordinates; rotation: Coordinates }
>();

export const multiplayerRouter = createRouter({
  // createRoom: protectedProcedure
  //   .input(z.object({ address: z.string(), name: z.string() }))
  //   .mutation(async ({ ctx: { db }, input: { name, address } }) => {
  //     try {
  //       const [rooms] = await db
  //         .select({ count: count(room.id) })
  //         .from(room)
  //         .where(eq(room.address, address));
  //       if (rooms.count >= 5) {
  //         throw new TRPCError({
  //           code: "FORBIDDEN",
  //           message: "You can only create up to 5 rooms",
  //         });
  //       }
  //       const id = Math.random().toString(36).substring(2, 8);
  //       const [newRoom] = await db
  //         .insert(room)
  //         .values({ id, name, address })
  //         .returning();
  //       return newRoom;
  //     } catch (error) {
  //       console.error(error);
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Failed to create room, please try again later",
  //         cause: error,
  //       });
  //     }
  //   }),

  onBroadcastPosition: protectedProcedure.subscription(async function* ({
    ctx: { ee },
  }) {
    for await (const [data] of ee.toIterable("broadcastPosition")) {
      const { address, position, rotation } = data as BroadcastPositionData;
      const playersCount = Array.from(totalPlayers).length;
      yield tracked(address, { address, position, rotation, playersCount });
    }
  }),

  broadcastPosition: protectedProcedure
    .input(
      z.object({
        address: z.string(),
        position: z.object({ x: z.number(), y: z.number(), z: z.number() }),
        rotation: z.object({ x: z.number(), y: z.number(), z: z.number() }),
      })
    )
    .mutation(async ({ ctx: { ee }, input }) => {
      totalPlayers.set(input.address, {
        position: input.position,
        rotation: input.rotation,
      });

      ee.emit("broadcastPosition", input);
    }),
});
