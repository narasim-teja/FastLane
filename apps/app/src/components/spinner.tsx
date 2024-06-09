import React from "react";

import { cn } from "@fastlane/ui";

type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
};

export function Spinner({ size = "md", ...props }: SpinnerProps) {
  return (
    <div {...props} className="grid h-screen w-full place-items-center">
      <span className="sr-only">Loading...</span>
      <div
        className={cn(
          "aspect-square h-16 animate-spin rounded-full border-y-2 border-primary lg:h-32",
          {
            "h-12 lg:h-24": size === "sm",
            "h-16 lg:h-32": size === "md",
            "h-20 lg:h-40": size === "lg",
          },
        )}
      />
    </div>
  );
}
