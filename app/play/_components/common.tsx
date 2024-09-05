"use client";

import React from "react";

import { OrbitControls, Stats } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

import type { DirectionalLight } from "three";

export default function Common({ children }: React.PropsWithChildren) {
  const light = React.useRef<DirectionalLight>(null);

  useFrame((state) => {
    if (!light.current) return;

    light.current.position.z = state.camera.position.z + 1 - 4;
    light.current.target.position.z = state.camera.position.z - 4;
    light.current.target.updateMatrixWorld();
  });

  const { showPerf, showStats } = useControls("Debug Tools", {
    showPerf: false,
    showStats: false,
  });

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      <OrbitControls makeDefault />

      {showPerf && <Perf />}
      {showStats && <Stats />}

      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1.5} />
      {children}
    </>
  );
}
