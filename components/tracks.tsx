import Image from "next/image";

import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "~/config/site";

import { GradientBall1, GradientBall2 } from "./icons";
import { Button } from "./ui/button";

export function Tracks() {
  return (
    <div className="flex flex-col gap-7 *:flex *:min-h-[25rem] *:max-w-xs *:flex-col *:justify-between *:overflow-hidden *:rounded-3xl *:border *:p-2 md:flex-row md:*:max-w-none">
      {/* https://github.com/tailwindlabs/tailwindcss/discussions/6614 */}
      <div className="group relative z-30 w-full border-[#d09500a2]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#d095001f] to-background duration-500 group-hover:from-[#d09500a2]" />
        <h3 className="p-2 text-sm text-[#D09500]">GOLD</h3>
        <Image
          loading="eager"
          src="/gold-coin.png"
          alt={`${siteConfig.name} Gold Track`}
          height={600}
          width={600}
          className="absolute -right-24 -top-20 -z-20 scale-[75%] opacity-10"
        />
        <Image
          loading="eager"
          src="/gold-coin.png"
          alt={`${siteConfig.name} Gold Track`}
          height={600}
          width={600}
          className="my-2 scale-[80%] drop-shadow-[0px_0px_21.1px_6px_#FBBA1540] transition-transform duration-500 group-hover:scale-90"
        />
        <Image
          loading="eager"
          src="/gold-coin.png"
          alt={`${siteConfig.name} Gold Track`}
          height={600}
          width={600}
          className="absolute -bottom-10 -left-24 -z-20 scale-[75%] opacity-40"
        />
        <Button
          variant="custom"
          href="/play?track=gold"
          className="rounded-full bg-[linear-gradient(180deg,_#FFB800_49.82%,_#8C6500_98.55%)] p-2 font-poppins font-semibold text-background"
        >
          Choose Track <ArrowUpRight className="ml-2 size-5" />
        </Button>
      </div>

      <div className="group relative w-full border-[#c2c2c27f]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#C2C2C21F] to-background group-hover:from-[#c2c2c254]" />
        <h3 className="p-2 text-sm text-[#C2C2C2]">ETH</h3>
        <Image
          loading="eager"
          src="/eth-coin.png"
          alt={`${siteConfig.name} Eth Track`}
          height={600}
          width={600}
          className="absolute -right-24 -top-20 -z-20 scale-[75%] opacity-10"
        />
        <Image
          loading="eager"
          src="/eth-coin.png"
          alt={`${siteConfig.name} Eth Track`}
          height={600}
          width={600}
          className="my-2 scale-[80%] drop-shadow-[0px_0px_23.6px_0px_#FFFFFF26] transition-transform duration-500 group-hover:scale-90"
        />
        <Image
          loading="eager"
          src="/eth-coin.png"
          alt={`${siteConfig.name} Eth Track`}
          height={600}
          width={600}
          className="absolute -bottom-10 -left-24 -z-20 scale-[75%] opacity-40"
        />
        <Button
          variant="custom"
          href="/play?track=eth"
          className="rounded-full bg-[linear-gradient(180deg,_#C6C6C6_49.82%,_#6B6B6B_98.55%)] p-2 font-poppins font-semibold text-background"
        >
          Choose Track <ArrowUpRight className="ml-2 size-5" />
        </Button>
      </div>

      <div className="group relative w-full bg-background transition-colors duration-300 *:duration-300 hover:bg-foreground">
        <h3 className="z-10 p-2 text-right font-poppins font-semibold uppercase transition-colors group-hover:text-background">
          Community <br /> Track
        </h3>

        <GradientBall2 className="absolute -left-24 -top-20 size-72 transition-transform group-hover:rotate-45 group-hover:scale-125" />

        <GradientBall1 className="absolute -bottom-20 -right-20 size-80 transition-transform group-hover:rotate-45 group-hover:scale-125" />

        <Button
          variant="custom"
          href="/play?track=community"
          className="rounded-xl border bg-transparent p-2 font-poppins font-semibold text-foreground backdrop-blur-sm group-hover:bg-background"
        >
          Explore <ArrowUpRight className="ml-2 size-5" />
        </Button>
      </div>
    </div>
  );
}
