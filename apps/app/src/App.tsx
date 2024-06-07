import React from "react";

import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";

import { Experience } from "./components/experience";
import { Lights } from "./components/lights";
import { Spinner } from "./components/spinner";

export default function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      ]}
    >
      <React.Suspense fallback={<Spinner />}>
        <Canvas
          shadows
          camera={{
            fov: 45,
            // NOTE: Use ints instead of floats for cost efficiency and full on-chain implementation
            // near: 0.1,
            near: 1,
            far: 200,
            position: [0, 4, 23],
          }}
        >
          <color args={["#bdedfc"]} attach="background" />
          <OrbitControls makeDefault />
          <Perf />
          <Physics debug={false}>
            <Lights />

            <Experience />
          </Physics>
        </Canvas>
      </React.Suspense>
    </KeyboardControls>
  );
}
