import React from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import type { Track } from "~/types/misc";

import { CommunityTrack } from "~/app/play/_components/community-track";
import { Spinner } from "~/components/spinner";
import { base64 } from "~/lib/utils";

import Common from "./_components/common";
import { GoldTrack } from "./_components/gold-track";

const View = dynamic(() => import("~/components/canvas/view"), {
  ssr: false,
  loading: () => <Spinner />,
});

type GamePageProps = {
  searchParams: {
    track: Track;
  };
};

export default function GamePage({ searchParams: { track } }: GamePageProps) {
  const address = base64.decode(cookies().get("address")?.value ?? "");

  return (
    <View className="h-dvh w-dvw bg-background">
      <Common />

      {track === "gold" && <GoldTrack />}
      {track === "eth" && <GoldTrack />}
      {track === "oasis-track" && <CommunityTrack address={address} />}
    </View>
  );
}
