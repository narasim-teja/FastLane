import React from "react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { KeyboardControls } from "~/components/keyboard-controls";
import { isLoggedIn } from "~/lib/actions/auth";
import { TRPCReactProvider } from "~/lib/trpc/react";

import { Interface } from "./_components/interface";

const Scene = dynamic(() => import("~/components/canvas/scene"), {
  ssr: false,
});

type GameLayoutProps = React.PropsWithChildren<{
  // ...
}>;

export default async function GameLayout({ children }: GameLayoutProps) {
  if (!(await isLoggedIn())) {
    redirect("/connect-wallet");
  }

  return (
    <TRPCReactProvider>
      <KeyboardControls>
        <div className="h-screen w-screen">
          {children}
          <Scene
            shadows
            camera={{
              fov: 45,
              // NOTE: Use ints instead of floats for cost efficiency and full on-chain implementation
              // near: 0.1,
              near: 1,
              far: 200,
              position: [0, 4, 23],
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
        </div>

        <Interface />
      </KeyboardControls>
    </TRPCReactProvider>
  );
}
