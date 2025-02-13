"use client";

import { cn } from "~/lib/utils";

export const Loader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative isolate grid h-dvh place-items-center",
        className
      )}
      {...props}
    >
      <div className="container">
        <div className="play grid grid-flow-col grid-cols-[calc(var(--loaderSize)_/_4)_calc(var(--loaderSize)_/_8)_calc(var(--loaderSize)_/_4)] items-end text-clip [overflow:clip_visible]">
          <div className="obstacle size-[var(--objSize)] origin-bottom-left rounded-full rounded-b-none bg-foreground" />

          <div className="player size-[var(--objSize)] justify-self-end rounded-[50%] bg-foreground [grid-column-start:3]" />
        </div>
        <div className="platform h-[calc(var(--loaderSize)_/_4)] w-full rounded-[0_0_0_999px] bg-foreground" />
      </div>
      <style jsx>{`
        .container {
          animation: logoToLoader_container var(--logoToLoaderDuration)
            var(--logoToLoaderDelay) forwards;
        }
        .container .play {
          animation: logoToLoader_play var(--logoToLoaderDuration)
            var(--logoToLoaderDelay) forwards;
        }
        .container .platform {
          animation: logoToLoader_platform var(--logoToLoaderDuration)
            var(--logoToLoaderDelay) forwards;
        }
        .container .obstacle {
          animation:
            logoToLoader_obstacle var(--logoToLoaderDuration)
              var(--logoToLoaderDelay) forwards,
            obstacleMove var(--obstacleMoveDuration) var(--logoToLoaderDuration)
              infinite linear;
        }
        .container .player {
          animation: playerBounce 2s var(--playerBounceDelay) infinite;
        }

        .container {
          --loaderSize: 400px;
          --obstacleScaleDown: 0.5;
          --logoToLoaderDuration: 2s;
          --logoToLoaderDelay: 0s;
          --obstacleMoveDuration: 2s;

          --objSize: calc(var(--loaderSize) / 4);

          width: var(--loaderSize);
          display: grid;
          gap: calc(var(--objSize) / 4.5);
          transform: rotate(90deg);
        }
        .player {
          --playerBounceDelay: calc(
            var(--logoToLoaderDuration) + (var(--obstacleMoveDuration) * 0.25)
          );
        }

        @keyframes logoToLoader_container {
          to {
            width: calc(var(--loaderSize) * 0.75);
            gap: 0;
            transform: rotate(0deg);
          }
        }
        @keyframes logoToLoader_play {
          to {
            grid-template-columns:
              calc(var(--loaderSize) / 4) calc(var(--loaderSize) / 4)
              calc(var(--loaderSize) / 4);
          }
        }
        @keyframes logoToLoader_obstacle {
          to {
            width: calc(var(--objSize) * var(--obstacleScaleDown));
            height: calc(var(--objSize) * var(--obstacleScaleDown));
            border-radius: 999px 999px 0 0;
          }
        }
        @keyframes logoToLoader_platform {
          to {
            border-bottom-right-radius: 999px;
          }
        }

        @keyframes playerBounce {
          0%,
          75%,
          100% {
            transform: translateY(0%);
            animation-timing-function: ease-out;
          }
          40%,
          45% {
            transform: translateY(-100%);
            animation-timing-function: ease-in;
          }
          90% {
            transform: translateY(-25%);
            animation-timing-function: ease-in;
          }
        }
        @keyframes obstacleMove {
          to {
            transform: translateX(calc(var(--loaderSize) * 0.75));
          }
        }
      `}</style>
    </div>
  );
};
