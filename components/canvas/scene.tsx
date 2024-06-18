"use client";

import React from "react";

import { Preload, View } from "@react-three/drei";
import { addEffect, Canvas } from "@react-three/fiber";
import Lenis from "@studio-freight/lenis";

import type { CanvasProps } from "@react-three/fiber";

type SceneProps = Omit<CanvasProps, "children">;

export default function Scene(props: SceneProps) {
  // Use lenis to control scrolling
  React.useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, syncTouch: true });
    const removeEffect = addEffect((time) => lenis.raf(time));

    return () => {
      lenis.destroy();
      removeEffect();
    };
  }, []);

  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas shadows {...props} eventSource={document.body} eventPrefix="client">
      <View.Port />
      <Preload all />
    </Canvas>
  );
}
