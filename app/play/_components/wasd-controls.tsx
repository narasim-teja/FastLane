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
  const [keys, setKeys] = React.useState<Set<Key>>(new Set());

  const handleKeyDown = React.useCallback(({ code }: KeyboardEvent) => {
    setKeys((prevKeys) => new Set(prevKeys.add(code as Key)));
  }, []);

  const handleKeyUp = React.useCallback(({ code }: KeyboardEvent) => {
    setKeys((prevKeys) => {
      const newKeys = new Set(prevKeys);
      newKeys.delete(code as Key);
      return newKeys;
    });
  }, []);

  useEventListener("keydown", handleKeyDown);
  useEventListener("keyup", handleKeyUp);

  return (
    <div className="fixed inset-x-1/2 bottom-4 z-10 grid w-full -translate-x-1/2 grid-flow-col grid-rows-2 items-center justify-center gap-2 *:size-12 *:rounded-md *:border *:border-white/20 *:backdrop-blur">
      <div
        className={cn(
          "col-start-2 row-start-1 bg-white/20",
          keys.has("ArrowUp") && "bg-white/40 shadow-md"
        )}
      />

      <div
        className={cn(
          "col-start-1 row-start-2 bg-white/20",
          keys.has("ArrowLeft") && "bg-white/40 shadow-md"
        )}
      />
      <div
        className={cn(
          "col-start-2 row-start-2 bg-white/20",
          keys.has("ArrowDown") && "bg-white/40 shadow-md"
        )}
      />
      <div
        className={cn(
          "col-start-3 row-start-2 bg-white/20",
          keys.has("ArrowRight") && "bg-white/40 shadow-md"
        )}
      />
    </div>
  );
}
