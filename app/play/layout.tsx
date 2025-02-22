// "use client"
import React from "react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { KeyboardControls } from "~/components/keyboard-controls";
import { isLoggedIn } from "~/lib/actions/auth";
import { TRPCReactProvider } from "~/lib/trpc/react";

import { Interface } from "./_components/interface";
// import { WagmiProvider } from "wagmi";
// import { config } from "./wagmi"
import Wagmi from "./wagmiprovider";

const Scene = dynamic(() => import("~/components/canvas/scene"), {
  ssr: false,
});

export default async function GameLayout(props: React.PropsWithChildren) {
  if (!(await isLoggedIn())) {
    redirect("/signin");
  }

  return (
    <Wagmi>
      <TRPCReactProvider>
        <KeyboardControls>
          {props.children}

          <Scene
            shadows
            camera={{
              fov: 45,
              // NOTE: Use ints instead of floats for cost efficiency and full on-chain implementation
              // near: 0.1,
              near: 1,
              far: 2000,
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              pointerEvents: "none",
            }}
          />

          <Interface />
        </KeyboardControls>
      </TRPCReactProvider>
    </Wagmi>
  );
}
