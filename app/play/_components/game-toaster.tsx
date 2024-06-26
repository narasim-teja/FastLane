"use client";

import React from "react";

import { Snail, Zap } from "lucide-react";

import { CircleProgress } from "~/components/ui/progress";
import { useGame } from "~/hooks/use-game";

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

  if (!isSpeedReduced && !isSpeedBoostActive) return null;

  return (
    <div className="fixed bottom-4 left-4 z-10 flex items-center gap-4 rounded-2xl border border-white/35 bg-white/40 p-4 shadow-md backdrop-blur-sm">
      <p className="font-matter text-lg font-semibold">
        {isSpeedBoostActive && (
          <>
            <Zap className="mr-2 inline-flex size-8 fill-yellow-500 stroke-yellow-500" />{" "}
            Speed Boost Active
          </>
        )}
        {isSpeedReduced && (
          <>
            <Snail className="mr-2 inline-flex size-8 stroke-red-400" /> Speed
            Reduced
          </>
        )}
      </p>

      <CircleProgress
        value={progress}
        progressColor={isSpeedBoostActive ? "lime" : "red"}
      />
    </div>
  );
}
