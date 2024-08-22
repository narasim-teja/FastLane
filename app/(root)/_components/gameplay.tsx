import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

enum TabsValue {
  Gameplay = "gameplay",
  Rules = "rules",
}

export function Gameplay() {
  return (
    <div className="mx-auto h-full max-w-5xl overflow-hidden rounded-3xl shadow-[0px_0px_98.9px_1px_#B400FF33]">
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent from-20% via-violet-500 via-50% to-transparent to-80%" />

      <div className="h-full bg-gradient-to-r from-background/50 via-zinc-900 to-zinc-900/50 p-4 md:p-8">
        <div className="rounded-2xl border border-border p-2 md:p-4">
          <Tabs defaultValue={TabsValue.Gameplay}>
            <div className="mb-4 flex justify-between px-2">
              <div className="flex items-center">
                <div className="z-0 size-10 rounded-full bg-white p-1 md:size-16 md:p-3">
                  <Image
                    loading="eager"
                    src="/cube-3d-line.png"
                    alt={`${siteConfig.name} cube`}
                    height={400}
                    width={400}
                    className="z-10"
                  />
                </div>

                <p className="-ml-4 rounded-r-3xl bg-zinc-800 py-2 pl-6 pr-4 text-xs md:text-base">
                  {siteConfig.url.replace(/https?:\/\//, "")}
                </p>
              </div>

              <TabsList
                className={cn(
                  "h-full rounded-full border border-zinc-800 bg-background p-1 text-lg md:p-2",
                  "*:inline-flex *:min-w-16 *:items-center *:justify-center *:rounded-full *:px-3 *:py-1.5 *:text-xs *:text-muted-foreground md:*:px-10 md:*:text-base",
                  "data-[state=active]:*:bg-gradient-to-b data-[state=active]:*:from-zinc-800 data-[state=active]:*:to-zinc-900 data-[state=active]:*:text-foreground"
                )}
              >
                <TabsTrigger value={TabsValue.Gameplay}>Gameplay</TabsTrigger>
                <TabsTrigger value={TabsValue.Rules}>Rules</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={TabsValue.Gameplay} className="p-3">
              <video
                src="/gameplay.mp4"
                preload="auto"
                playsInline
                autoPlay
                muted
                loop
                className="aspect-video w-full rounded-3xl object-cover"
              />
            </TabsContent>

            <TabsContent value={TabsValue.Rules} className="p-3">
              <video
                src="/gameplay.mp4"
                preload="auto"
                playsInline
                autoPlay
                muted
                loop
                className="aspect-video w-full rounded-3xl object-cover"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
