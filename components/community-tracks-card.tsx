"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { cn } from "~/lib/utils";

import { GradientBall1, GradientBall2 } from "./icons";
import { Button } from "./ui/button";

const communityTracks = [
  {
    name: "Oasis Track",
    image: "/images/oasis-logo.png",
    slug: "oasis-track",
  },
];

export function CommunityTracksCard() {
  const [showTracks, setShowTracks] = React.useState(false);

  return (
    <div
      className={cn(
        "relative w-full bg-background transition-colors duration-300 *:duration-300",
        showTracks ? "backdrop-blur-2xl" : "group hover:bg-foreground"
      )}
    >
      {!showTracks && (
        <h3 className="z-10 p-2 text-right font-poppins font-semibold uppercase transition-colors group-hover:text-background">
          Community <br /> Track
        </h3>
      )}

      <GradientBall2 className="absolute -left-24 -top-20 size-72 transition-transform group-hover:rotate-45 group-hover:scale-125" />

      <GradientBall1 className="absolute -bottom-20 -right-20 size-80 rounded-full transition-transform group-hover:rotate-45 group-hover:scale-125" />

      {!showTracks && (
        <Button
          variant="custom"
          hidden={!showTracks}
          onClick={() => setShowTracks(true)}
          className="rounded-xl border bg-transparent p-2 font-poppins font-semibold text-foreground backdrop-blur-sm group-hover:bg-background"
        >
          Explore <ArrowUpRight className="ml-2 size-5" />
        </Button>
      )}

      <div
        className={cn(
          "absolute inset-0 h-full space-y-2 bg-foreground/10 p-4 backdrop-blur animate-in slide-in-from-bottom-full",
          !showTracks && "hidden"
        )}
      >
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowTracks(false)}
            className="rounded-lg hover:bg-accent/20"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <h3 className="font-poppins uppercase">Community Track</h3>
        </div>

        <div className="-mr-2 grid h-full grid-cols-1 gap-2 pr-2">
          {communityTracks.map(({ name, image, slug }) => (
            <Link
              key={name}
              href={`/play?track=${slug}`}
              className="flex h-fit items-center gap-2 rounded-xl border border-border/50 bg-background/30 p-2 backdrop-blur-sm"
            >
              <Image
                src={image}
                alt={name}
                height={32}
                width={32}
                className="size-8 object-contain"
              />

              <h4 className="truncate font-poppins font-semibold">{name}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
