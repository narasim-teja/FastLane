import { cn } from "~/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

type WaitlistFormProps = {
  isFooter?: boolean;
};

export function WaitlistForm({ isFooter = false }: WaitlistFormProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 md:flex-row",
        isFooter ? "w-full" : "duration-1000 animate-in slide-in-from-top-1/4"
      )}
    >
      <Input
        placeholder="Enter your email address"
        className={cn(
          "h-12 w-full rounded-4xl border-2 font-matter text-lg focus-visible:ring-4",
          !isFooter && "sm:h-16 sm:text-2xl"
        )}
      />

      <Button
        className={cn(
          "h-12 rounded-4xl p-4 text-lg font-semibold uppercase transition-all duration-200 ease-in-out hover:rounded-2xl",
          !isFooter && "px-8 sm:h-16 sm:text-xl"
        )}
      >
        Join Waitlist
      </Button>
    </div>
  );
}
