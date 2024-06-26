import React from "react";
import dynamic from "next/dynamic";

import { Interface } from "~/app/play/_components/interface";
import { Spinner } from "~/components/spinner";

import { Experience } from "./_components/experience";

const View = dynamic(() => import("~/components/canvas/view"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function GamePage() {
  return (
    <>
      <View className="h-screen w-screen">
        <Experience />
      </View>

      <Interface />
    </>
  );
}
