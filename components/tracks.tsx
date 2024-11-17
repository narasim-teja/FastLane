import Image from "next/image";

import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "~/config/site";

import { CommunityTracksCard } from "./community-tracks-card";
import { Button } from "./ui/button";

export function Tracks() {
  return (
    <div className="flex flex-col gap-7 *:flex *:min-h-[25rem] *:max-w-xs *:flex-col *:justify-between *:overflow-hidden *:rounded-3xl *:border *:p-2 md:flex-row md:*:max-w-none">
      {/* https://github.com/tailwindlabs/tailwindcss/discussions/6614 */}
      <div className="group relative z-30 w-full border-[#d09500a2]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#d095001f] to-background duration-500 group-hover:from-[#d09500a2]" />
        <div className="flex items-center justify-between">
          <h3 className="p-2 text-sm text-[#D09500]">GOLD</h3>
          <h3 className="text-sm text-[#D09500]">
            Powered By:{" "}
            <span className="font-semibold underline underline-offset-4">
              Oasis
            </span>
          </h3>
        </div>
        <Image
          loading="eager"
          src="/images/gold-coin.png"
          alt={`${siteConfig.name} Gold Track`}
          height={600}
          width={600}
          className="absolute -right-24 -top-20 -z-20 scale-[75%] opacity-10"
        />
        <Image
          loading="eager"
          src="/images/gold-coin.png"
          alt={`${siteConfig.name} Gold Track`}
          height={600}
          width={600}
          className="my-2 scale-[80%] drop-shadow-[0px_0px_21.1px_6px_#FBBA1540] transition-transform duration-500 group-hover:scale-90"
        />
        <Image
          loading="eager"
          src="/images/gold-coin.png"
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
        <div className="flex items-center justify-between">
          <h3 className="p-2 text-sm text-[#C2C2C2]">ETH</h3>
          <h3 className="text-sm text-[#C2C2C2]">
            Powered By:{" "}
            <span className="font-semibold underline underline-offset-4">
              Cartesi
            </span>
          </h3>
        </div>
        <Image
          loading="eager"
          src="/images/eth-coin.png"
          alt={`${siteConfig.name} Eth Track`}
          height={600}
          width={600}
          className="absolute -right-24 -top-20 -z-20 scale-[75%] opacity-10"
        />
        <Image
          loading="eager"
          src="/images/eth-coin.png"
          alt={`${siteConfig.name} Eth Track`}
          height={600}
          width={600}
          className="my-2 scale-[80%] drop-shadow-[0px_0px_23.6px_0px_#FFFFFF26] transition-transform duration-500 group-hover:scale-90"
        />
        <Image
          loading="eager"
          src="/images/eth-coin.png"
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

      <CommunityTracksCard />
    </div>
  );
}
