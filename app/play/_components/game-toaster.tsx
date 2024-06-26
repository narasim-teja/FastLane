"use client";

import React from "react";

import { Snail, Zap } from "lucide-react";

import { CircleProgress } from "~/components/ui/progress";
import { useGame } from "~/hooks/use-game";
import { cn } from "~/lib/utils";

export function GameToaster() {
  const { isSpeedReduced, isSpeedBoostActive } = useGame();

  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSpeedBoostActive) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }

          return prev - 1;
        });
      }, 30);
    } else if (isSpeedReduced) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }

          return prev - 1;
        });
      }, 40);
    } else {
      setProgress(100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSpeedBoostActive, isSpeedReduced]);

  return (
    <div
      className={cn(
        "fixed inset-x-4 top-4 z-10 flex w-full md:bottom-4 md:top-auto",
        !isSpeedBoostActive && !isSpeedReduced && "invisible"
      )}
    >
      <div className="flex items-center gap-4 rounded-2xl border border-white/35 bg-white/40 p-4 shadow-md backdrop-blur-sm">
        <div className="font-matter text-lg font-semibold">
          {isSpeedBoostActive && (
            <p className="flex items-start">
              <Zap className="mr-2 size-8 fill-yellow-500 stroke-yellow-500" />
              <span>Speed Boost Active</span>
            </p>
          )}
          {isSpeedReduced && (
            <p className="flex items-start">
              <Snail className="mr-2 size-8 stroke-red-400" />
              <span>Speed Reduced</span>
            </p>
          )}
        </div>

        <CircleProgress
          value={progress}
          progressColor={isSpeedBoostActive ? "lime" : "red"}
        />
      </div>
    </div>
  );
}
