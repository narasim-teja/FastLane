import Image from "next/image";

import { siteConfig } from "~/config/site";

export function Gameplay() {
  return (
    <div className="mx-auto h-full max-w-5xl overflow-hidden rounded-3xl shadow-[0px_0px_98.9px_1px_#B400FF33]">
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent from-20% via-violet-500 via-50% to-transparent to-80%" />

      <div className="h-full bg-gradient-to-r from-background/50 via-zinc-900 to-zinc-900/50 p-8">
        <div className="rounded-2xl border border-border p-4">
          <div className="mb-4 flex justify-between px-2">
            <div className="flex items-center">
              <div className="z-0 size-16 rounded-full bg-white p-3">
                <Image
                  src="/cube-3d-line.png"
                  alt={`${siteConfig.name} cube`}
                  height={400}
                  width={400}
                  className="z-10"
                />
              </div>

              <div className="-ml-4 rounded-r-3xl bg-zinc-800 py-2 pl-6 pr-4">
                {siteConfig.url.replace(/https?:\/\//, "")}
              </div>
            </div>

            <div className="h-full rounded-full border border-zinc-800 bg-background p-2 text-lg *:inline-flex *:items-center *:justify-center *:rounded-full *:px-10 *:py-1.5">
              <button className="bg-gradient-to-b from-zinc-800 to-zinc-900 text-foreground">
                Gameplay
              </button>
              <button className="text-neutral-500">Walkthrough</button>
            </div>
          </div>

          <div className="p-3">
            <video
              src="/gameplay.mp4"
              preload="auto"
              playsInline
              autoPlay
              muted
              loop
              className="aspect-video w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
