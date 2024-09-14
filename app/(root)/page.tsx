import Image from "next/image";

import { HeroRadialGradient } from "~/components/icons";
import { siteConfig } from "~/config/site";

import { DiscoverTracks } from "./_components/discover-tracks";
import { Gameplay } from "./_components/gameplay";
import { Hero } from "./_components/hero";
import { RollingBall } from "./_components/rolling-ball";

export default function LandingPage() {
  return (
    <main className="mb-10 flex flex-col gap-8">
      <div className="absolute inset-x-0 top-0 -z-50 h-full">
        <Image
          priority
          loading="eager"
          src="/planet.png"
          alt={`${siteConfig.name} background planet`}
          height={1000}
          width={1000}
          className="w-full object-cover"
        />

        <div className="absolute inset-0 h-[130vh] bg-[linear-gradient(106.17deg,_#020203_36.71%,_rgba(0,_0,_0,_0)_100%)]" />

        <HeroRadialGradient
          height={1276}
          width={800}
          className="absolute right-0 top-0 object-cover"
        />

        {Array.from({ length: Math.floor(Math.random() * 20) + 20 }, (_, i) => (
          <div
            key={i}
            className="absolute left-0 top-0 size-0.5 animate-pulse rounded-full bg-foreground"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
            }}
          />
        ))}
      </div>

      <Hero />
      <Gameplay from="landing" />
      <DiscoverTracks />
      <RollingBall />
    </main>
  );
}
