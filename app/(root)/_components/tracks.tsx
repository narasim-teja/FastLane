"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { MoveUpRight } from "lucide-react";

import { CanvasRevealEffect } from "~/components/aceternity-ui/canvas-reveal-effect";
import { WobbleCard } from "~/components/aceternity-ui/wobble-card";
import { tracks } from "~/config/tracks";

import { TrackCard } from "./track-card";

export function Tracks() {
  return (
    <section className="space-y-10">
      <h2 className="text-center font-cal text-3xl drop-shadow md:text-4xl lg:text-5xl xl:text-6xl">
        Discover exciting tracks
      </h2>

      <div className="flex flex-wrap items-center justify-around gap-10">
        {tracks.map((track, i) => (
          <Link key={i} href={`/tracks?type=${track.title.toLowerCase()}`}>
            <WobbleCard
              containerClassName="rounded-4xl bg-transparent border-2 p-4 border-dashed sm:h-[500px] sm:w-[380px]"
              className="relative flex flex-col bg-[#ebebeb] py-10 sm:!p-0"
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
              </TrackCard>
            </WobbleCard>
          </Link>
        ))}
      </div>

      <p className="text-center font-sans text-lg lowercase md:text-xl">
        Explore more exciting{" "}
        <Link
          href="/tracks"
          className="inline-flex items-center gap-0.5 underline-offset-4 hover:underline"
        >
          tracks <MoveUpRight className="-mb-1 size-4" />
        </Link>{" "}
        and{" "}
        <Link
          href="/tracks#community-tracks"
          className="inline-flex items-center gap-0.5 underline-offset-4 hover:underline"
        >
          community tracks <MoveUpRight className="-mb-1 size-4" />
        </Link>
      </p>

      {/* <h2 className="text-center font-cal text-3xl drop-shadow md:text-4xl lg:text-5xl xl:text-6xl">
        Community tracks
      </h2> */}

      {/* <div className="flex flex-wrap items-center justify-around gap-10">
        {communityTracks.map((track, i) => (
          <WobbleCard
            key={i}
            containerClassName="rounded-4xl bg-transparent border-2 p-4 border-dashed h-[500px] w-[380px]"
            className="flex max-w-fit flex-col bg-[#ebebeb] py-10"
          >
            <div className="text-center">
              <h3 className="font-matter text-3xl font-semibold">
                {track.title}
              </h3>
              <p className="text-lg font-medium">{track.description}</p>
            </div>

            <div className="">
              <Image
                src={track.image}
                alt={track.title}
                width={300}
                height={400}
              />
            </div>
          </WobbleCard>
        ))}

        <WobbleCard
          containerClassName="rounded-4xl bg-transparent border-2 p-4 border-dashed h-[500px] w-[380px]"
          className="flex max-w-fit flex-col bg-[#ebebeb] py-10"
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
                href="https://discord.gg/fastlane"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-500"
              >
                Join our Discord
              </a>{" "}
              and let us know!
            </p>
          </div>
        </WobbleCard>
      </div> */}
    </section>
  );
}
