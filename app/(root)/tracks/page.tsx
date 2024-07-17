"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Plus, Rocket } from "lucide-react";
import { toast } from "sonner";

import { CanvasRevealEffect } from "~/components/aceternity-ui/canvas-reveal-effect";
import { WobbleCard } from "~/components/aceternity-ui/wobble-card";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { communityTracks, tracks } from "~/config/tracks";
import { cn } from "~/lib/utils";

import { TrackCard } from "../_components/track-card";

type Props = {
  searchParams: {
    type?: string;
  };
};

export default function TracksPage({ searchParams: { type } }: Props) {
  const [selectedTrack, setSelectedTrack] = React.useState(type ?? null);

  const router = useRouter();

  function handleLaunchGame() {
    if (!selectedTrack) {
      toast.warning("Hold on!", {
        description: "Please select a track to start your journey.",
      });

      return;
    }

    router.push(`/play?track=${selectedTrack}`);
  }

  return (
    <div className="container flex flex-col justify-center gap-10">
      <h1 className="text-center font-cal text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        Choose a track to start your journey
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-10">
        {tracks.map((track, i) => (
          <WobbleCard
            key={i}
            onClick={() => setSelectedTrack(track.title.toLowerCase())}
            containerClassName={cn(
              "rounded-4xl border-2 border-dashed bg-transparent p-4 sm:h-[500px] sm:w-[380px]",
              track.title.toLowerCase() === selectedTrack &&
                "ring-4 ring-ring ring-offset-8 ring-offset-background"
            )}
            className="relative flex cursor-pointer flex-col bg-[#ebebeb] py-10 sm:!p-0"
          >
            <TrackCard
              canvas={
                <CanvasRevealEffect
                  showGradient={false}
                  dotSize={3}
                  animationSpeed={5.1}
                  containerClassName="bg-transparent"
                  colors={[track.color]}
                />
              }
            >
              <div className="text-center">
                <h3 className="font-matter text-3xl font-semibold">
                  {track.title}
                </h3>
                <p className="text-lg font-medium">{track.description}</p>
              </div>

              <Image
                src={track.image}
                alt={track.title}
                width={300}
                height={400}
                className={track.className}
              />

              <div className="text-center">
                <p>Join the fun for just</p>
                <p className="font-matter text-lg font-medium">
                  {track.entryFee}
                </p>
              </div>
            </TrackCard>
          </WobbleCard>
        ))}
      </div>

      <h2 className="text-center font-cal text-2xl drop-shadow md:text-3xl lg:text-4xl xl:text-5xl">
        Community tracks
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-10">
        {communityTracks.map((track, i) => (
          <WobbleCard
            key={i}
            onClick={() => setSelectedTrack(track.title.toLowerCase())}
            containerClassName={cn(
              "rounded-4xl border-2 border-dashed bg-transparent p-4 sm:h-[500px] sm:w-[380px]",
              track.title.toLowerCase() === selectedTrack &&
                "ring-4 ring-ring ring-offset-8 ring-offset-background"
            )}
            className="relative flex cursor-pointer flex-col bg-[#ebebeb] py-10 sm:!p-0"
          >
            <TrackCard
              canvas={
                <CanvasRevealEffect
                  showGradient={false}
                  dotSize={3}
                  animationSpeed={5.1}
                  containerClassName="bg-indigo-100"
                  colors={[track.color]}
                />
              }
            >
              <div className="text-center">
                <h3 className="font-matter text-3xl font-semibold">
                  {track.title}
                </h3>
                <p className="text-lg font-medium">{track.description}</p>
              </div>

              <Image
                src={track.image}
                alt={track.title}
                width={300}
                height={400}
                className={track.className}
              />

              <div className="text-center">
                <p>Join the fun for just</p>
                <p className="font-matter text-lg font-medium">
                  {track.entryFee}
                </p>
              </div>
            </TrackCard>
          </WobbleCard>
        ))}

        <WobbleCard
          containerClassName="rounded-4xl bg-transparent border-2 p-4 border-dashed h-[500px] w-[380px]"
          className="flex max-w-fit flex-col bg-[#ebebeb] py-10"
        >
          <TrackCard
            canvas={
              <CanvasRevealEffect
                showGradient={false}
                dotSize={3}
                animationSpeed={5.1}
                containerClassName="bg-transparent"
                colors={[[180, 180, 180]]}
              />
            }
          >
            <div className="flex size-full h-full flex-col items-center justify-center gap-4">
              <Plus
                size={64}
                className="rounded-full border border-dashed bg-muted p-1"
              />

              <p className="text-center text-lg font-medium">
                Have a track idea?
                <br />
                <a
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-500 underline-offset-4 hover:text-blue-600 hover:underline"
                >
                  Join our Discord
                </a>{" "}
                and let us know!
              </p>
            </div>
          </TrackCard>
        </WobbleCard>
      </div>

      <Button
        variant="outline"
        onClick={handleLaunchGame}
        className={cn(
          "fixed bottom-10 left-1/2 h-[54px] -translate-x-1/2 rounded-4xl border-2 px-8 py-4 text-lg font-semibold uppercase shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:[box-shadow:_2px_4px_0_#000] active:translate-y-0"
        )}
      >
        <Rocket className="mr-2" />
        Launch Game
      </Button>
    </div>
  );
}
