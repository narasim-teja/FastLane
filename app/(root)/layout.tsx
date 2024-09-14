import React from "react";
import dynamic from "next/dynamic";

import { Footer } from "~/components/site-footer/footer";
import { Navbar } from "~/components/site-header/navbar";

const Scene = dynamic(() => import("~/components/canvas/scene"), {
  ssr: false,
});

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />

      <Scene
        shadows
        camera={{
          fov: 45,
          // NOTE: Use ints instead of floats for cost efficiency and full on-chain implementation
          // near: 0.1,
          near: 1,
          far: 200,
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

      {children}

      <Footer />
    </>
  );
}
