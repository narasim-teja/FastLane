"use client";

import React from "react";

import { BlueBeam } from "~/components/icons";
import { siteConfig } from "~/config/site";

export function RollingBall() {
  const ballRef = React.useRef<HTMLDivElement>(null);

  function moveBall() {
    if (!ballRef.current) return;

    const ball = ballRef.current;

    if (ball.classList.contains("top-[44%]")) {
      ball.classList.remove("top-[44%]", "size-5");
      ball.classList.add("top-[58%]", "size-40");
    } else {
      ball.classList.remove("top-[58%]", "size-40");
      ball.classList.add("top-[44%]", "size-5");
    }
  }

  return (
    <div className="overflow-hidden">
      <div onClick={moveBall} className="relative">
        <BlueBeam className="mx-auto -mt-10 h-[30vh] w-screen scale-[2] object-cover sm:-mt-16 sm:h-[40vh] sm:scale-150 md:-mt-20 md:h-[70vh] md:scale-110 lg:-mt-24 lg:h-[625px] lg:w-[1022px] lg:scale-100" />

        <div
          ref={ballRef}
          className="absolute inset-x-1/2 top-[44%] size-5 -translate-x-1/2 rounded-full bg-[radial-gradient(86.11%_86.11%_at_50%_50%,_#4D0099_18.95%,_#310062_64.97%)] shadow-[0px_6px_1.5px_0px_#00000040] brightness-150 transition-all duration-1000 ease-in-out"
        />
      </div>

      <div className="mt-20 flex flex-col items-center gap-2 md:-mt-20">
        <p className="mx-auto mb-10 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-0.5 text-xl font-light">
          {siteConfig.url.replace(/https?:\/\//, "")}
        </p>

        <p className="text-5xl font-light">Mint and Play</p>

        <div className="mt-6 size-5 rounded-full bg-foreground" />

        <div className="h-px w-full max-w-7xl bg-[linear-gradient(90deg,_rgba(0,_0,_0,_0)_0%,_#05D7DA_52.61%,_rgba(0,_0,_0,_0)_100%)]" />
      </div>
    </div>
  );
}
