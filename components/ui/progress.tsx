"use client";

import * as React from "react";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "~/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="size-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

type CircleProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  label?: React.ReactNode;
  trackColor?: string;
  progressColor?: string;
  strokeWidth?: number;
};

const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CircleProgressProps
>(
  (
    {
      className,
      value,
      label,
      trackColor,
      progressColor,
      strokeWidth,
      ...props
    },
    ref
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        `relative flex size-20 items-center justify-center overflow-hidden rounded-full bg-primary/20 font-mono text-lg font-medium`,
        className
      )}
      {...props}
    >
      <svg
        className="absolute left-0 top-0 size-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke={trackColor ?? "rgb(229,231,235)"}
          strokeWidth={strokeWidth ?? 8}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke={progressColor ?? "rgb(99,102,241)"}
          strokeWidth={strokeWidth ?? 8}
          strokeDasharray="251.2"
          strokeDashoffset={251.2 * (1 - (value ?? 100) / 100)}
        />
      </svg>
      {label ?? `${value || 0}%`}
    </ProgressPrimitive.Root>
  )
);

CircleProgress.displayName = "CircleProgress";

export { Progress, CircleProgress };
