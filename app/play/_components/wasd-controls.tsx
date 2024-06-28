"use client";

import React from "react";

import { useKeyboardControls } from "@react-three/drei";

import type { Controls } from "~/components/keyboard-controls";

import { cn } from "~/lib/utils";

export function WASDControls() {
  // @ts-expect-error mismatched types
  const controls = useKeyboardControls((state) => state) as Record<
    Controls,
    boolean
  >;

  return (
    <div className="fixed inset-x-1/2 bottom-4 z-10 grid w-full -translate-x-1/2 grid-flow-col grid-rows-2 items-center justify-center gap-2 *:size-12 *:rounded-md *:border *:border-white/20 *:backdrop-blur">
      <div
        className={cn(
          "col-start-2 row-start-1 bg-white/20",
          controls.forward && "bg-white/40 shadow-md"
        )}
      />

      <div
        className={cn(
          "col-start-1 row-start-2 bg-white/20",
          controls.leftward && "bg-white/40 shadow-md"
        )}
      />
      <div
        className={cn(
          "col-start-2 row-start-2 bg-white/20",
          controls.backward && "bg-white/40 shadow-md"
        )}
      />
      <div
        className={cn(
          "col-start-3 row-start-2 bg-white/20",
          controls.rightward && "bg-white/40 shadow-md"
        )}
      />
    </div>
  );
}
