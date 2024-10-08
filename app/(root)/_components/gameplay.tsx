import React from "react";
import dynamic from "next/dynamic";

import { Cube3DLine } from "~/components/icons";
import { Spinner } from "~/components/spinner";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

import { GamePlayModel } from "./gameplay-model";

const View = dynamic(() => import("~/components/canvas/view"), {
  ssr: false,
  loading: () => <Spinner />,
});

enum TabsValue {
  Gameplay = "gameplay",
  Rules = "rules",
}

export const Gameplay: React.FC<{ from: "signin" | "landing" }> = ({
  from,
}) => {
  return (
    <div className="mx-auto size-full max-w-5xl overflow-hidden rounded-3xl shadow-[0px_0px_98.9px_1px_#B400FF33]">
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent from-20% via-violet-500 via-50% to-transparent to-80%" />

      <div
        className={cn(
          "size-full bg-gradient-to-r from-background/50 via-zinc-900 to-zinc-900/50 p-4",
          from === "landing" && "md:p-8"
        )}
      >
        <div className="w-full rounded-2xl border border-border p-2 md:p-4">
          <Tabs defaultValue={TabsValue.Gameplay}>
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center">
                <div className="z-0 flex size-10 items-center justify-center rounded-full bg-white p-1 md:size-16 md:p-3">
                  <Cube3DLine height={40} width={40} className="z-10" />
                </div>

                <p className="-ml-4 rounded-r-3xl bg-zinc-800 py-2 pl-6 pr-4 text-xs md:text-sm lg:text-base">
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

            <TabsContent
              value={TabsValue.Gameplay}
              className={cn(
                "relative aspect-video w-full overflow-hidden rounded-3xl",
                from === "landing" && "p-3"
              )}
            >
              <View className="size-full rounded-3xl border">
                <GamePlayModel
                  scale={0.8}
                  position={[-0.5, 0.4, 0]}
                  rotation={[0.55, -5.7, -0.1]}
                />
              </View>
            </TabsContent>

            <TabsContent
              value={TabsValue.Rules}
              className={cn(
                "relative aspect-video w-full overflow-hidden rounded-3xl",
                from === "landing" && "p-3"
              )}
            >
              <video
                src="/videos/gameplay.mp4"
                preload="auto"
                playsInline
                autoPlay
                muted
                loop
                className="rounded-3xl"
              />
              <Skeleton className="absolute inset-3 -z-10 rounded-3xl" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
