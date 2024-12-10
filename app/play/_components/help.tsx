import React from "react";

import { Info } from "lucide-react";

import type { HTMLAttributes } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";

export function Help() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed right-4 top-4 z-10 shrink-0 border border-white/20 bg-white/20 shadow backdrop-blur hover:bg-white/35 md:bottom-4 md:top-auto"
        >
          <Info className="text-muted" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4">
        <DialogHeader>
          <DialogTitle className="font-cal text-3xl tracking-wide">
            Help
          </DialogTitle>
          <DialogDescription>
            Welcome to Fastlane! Here&apos;s a quick guide to get you started.
          </DialogDescription>
        </DialogHeader>

        <GameControls />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const GameControls: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex shrink-0 justify-evenly gap-4 font-mono", className)}
      {...props}
    >
      {/* WASD movement controls */}
      <div className="flex flex-col justify-between gap-4 text-lg font-semibold">
        <div
          className={cn(
            "grid grid-cols-3 gap-1 text-2xl font-black",
            "*:flex *:size-12 *:items-center *:justify-center *:rounded-md *:bg-foreground/20 *:shadow-sm *:backdrop-blur"
          )}
        >
          <div className="col-span-3 mx-auto">W</div>
          <div>A</div>
          <div>S</div>
          <div>D</div>
          <div className="col-span-3 mx-auto flex !h-11 !w-full flex-col">
            <p className="text-xl leading-none">Space</p>
            <p className="text-xs">Jump</p>
          </div>
        </div>
        <p className="text-center">MOVEMENT</p>
      </div>

      {/* Arrow keys camera controls */}
      <div className="flex flex-col justify-between gap-4 text-lg font-semibold">
        <div
          className={cn(
            "grid grid-cols-3 gap-1 text-2xl font-black",
            "*:flex *:size-12 *:items-center *:justify-center *:rounded-md *:bg-foreground/20 *:shadow-sm *:backdrop-blur"
          )}
        >
          <div className="col-span-3 mx-auto">↑</div>
          <div>←</div>
          <div>↓</div>
          <div>→</div>
        </div>
        <p className="text-center">CAMERA ROTATION</p>
      </div>

      {/* Camera mode toggle control */}
      <div className="flex flex-col items-center justify-between gap-4 text-lg font-semibold">
        <div
          className={cn(
            "grid grid-cols-1 gap-1 text-2xl font-black",
            "*:flex *:size-12 *:items-center *:justify-center *:rounded-md *:bg-foreground/20 *:shadow-sm *:backdrop-blur"
          )}
        >
          <div className="flex !h-12 !w-12 flex-col">
            <p className="text-xl leading-none">K</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 font-mono">
          <p className="text-xs">First Person</p>
          <p className="text-xs">Top Down</p>
          <p className="text-xs">Normal</p>
        </div>

        <p className="text-center">CAMERA MODE</p>
      </div>
    </div>
  );
};
