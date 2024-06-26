"use client";

import React from "react";

import { useEventListener } from "~/hooks/use-event-listner";
import { cn } from "~/lib/utils";

type Key =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "KeyW"
  | "KeyS"
  | "KeyA"
  | "KeyD";

export function WASDControls() {
  const [key, setKey] = React.useState<Key | null>(null);

  useEventListener("keydown", ({ code }) => {
    if (code === "ArrowUp" || code === "KeyW") {
      setKey("ArrowUp");
    } else if (code === "ArrowDown" || code === "KeyS") {
      setKey("ArrowDown");
    } else if (code === "ArrowLeft" || code === "KeyA") {
      setKey("ArrowLeft");
    } else if (code === "ArrowRight" || code === "KeyD") {
      setKey("ArrowRight");
    }
  });

  useEventListener("keyup", () => setKey(null));

  return (
    <div className="fixed inset-x-1/2 bottom-4 z-10 grid w-full -translate-x-1/2 grid-flow-col grid-rows-2 items-center justify-center gap-2 *:size-12 *:rounded-md *:border *:border-white/20 *:backdrop-blur">
      <div
        className={cn(
          "col-start-2 row-start-1 bg-white/20",
          key === "ArrowUp" && "bg-white/40 shadow-md"
        )}
      />

      <div
        className={cn(
          "col-start-1 row-start-2 bg-white/20",
          key === "ArrowLeft" && "bg-white/40 shadow-md"
        )}
      />
      <div
        className={cn(
          "col-start-2 row-start-2 bg-white/20",
          key === "ArrowDown" && "bg-white/40 shadow-md"
        )}
      />
      <div
        className={cn(
          "col-start-3 row-start-2 bg-white/20",
          key === "ArrowRight" && "bg-white/40 shadow-md"
        )}
      />
    </div>
  );
}
