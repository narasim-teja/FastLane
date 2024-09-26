import React from "react";
import dynamic from "next/dynamic";

import type { Track } from "~/types/misc";

import { CommunityTrack } from "~/app/play/_components/community-track";
import { Spinner } from "~/components/spinner";

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
  return (
    <View className="h-dvh w-dvw">
      <Common />

      {track === "gold" && <GoldTrack />}
      {track === "eth" && <GoldTrack />}
      {track === "oasis-track" && <CommunityTrack />}
    </View>
  );
}
