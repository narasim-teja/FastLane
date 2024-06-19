import { Construction } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { siteConfig } from "~/config/site";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-4 p-4 text-center">
      <Badge variant="outline" className="text-xs md:text-sm">
        <Construction className="mr-2 size-4" /> Currently in development
      </Badge>

      <h1 className="group font-cal text-5xl font-bold duration-1000 ease-out animate-in fade-in-0 slide-in-from-top-1/4 sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="duration-150 [text-shadow:_2px_6px_0_#d1d1d1] group-hover:[text-shadow:_4px_8px_0_#d1d1d1]">
          Welcome to
        </span>{" "}
        <span
          className="block text-background duration-150 [text-shadow:_2px_6px_0_#000] group-hover:[text-shadow:_4px_8px_0_#000] sm:inline-flex"
          style={{ WebkitTextStroke: "2px #000" }}
        >
          {siteConfig.name}
        </span>
      </h1>

      <p className="font-matter text-xl font-semibold duration-1000 animate-in slide-in-from-top-1/4 sm:text-2xl md:text-4xl">
        {siteConfig.description}
      </p>
    </section>
  );
}
