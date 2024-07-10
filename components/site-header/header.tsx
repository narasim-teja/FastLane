"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { useEventListener } from "~/hooks/use-event-listner";
import { cn } from "~/lib/utils";

type HeaderProps = React.PropsWithChildren<{
  // ...
}>;

export function Header({ children }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const pathname = usePathname();

  useEventListener("scroll", () => {
    if (window.scrollY >= 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 sm:inset-x-2 sm:top-4 xl:inset-x-0">
      <div
        className={cn(
          "container block w-full border-b-2 border-transparent transition-colors duration-200 ease-out sm:rounded-full sm:border-2",
          (isScrolled || pathname === "/signin") &&
            "border-border bg-background"
        )}
      >
        {children}
      </div>
    </header>
  );
}
