import dynamic from "next/dynamic";

import type { Track } from "~/types/misc";

import { Spinner } from "~/components/spinner";
import { EthTrack } from "~/components/tracks/eth-track";
import { GoldTrack } from "~/components/tracks/gold-track";
import { CommunityTrack } from "~/components/tracks/oasis-community-track";

import Common from "./_components/common";

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
    <View className="h-dvh w-dvw bg-background">
      <Common />

      {track === "gold" && <GoldTrack />}
      {track === "eth" && <EthTrack />}
      {track === "oasis-track" && <CommunityTrack />}
    </View>
  );
}
