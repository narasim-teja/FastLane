"use client";

import { useSearchParams } from "next/navigation";

import { Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import type { CanvasProps } from "@react-three/fiber";

type SceneProps = Omit<CanvasProps, "children">;

export default function Scene(props: SceneProps) {
  const searchParams = useSearchParams();
  const showLevaPanel = searchParams.has("debug");

  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <>
      <Leva hidden={!showLevaPanel} />
      <Canvas
        shadows
        {...props}
        eventSource={document.body}
        eventPrefix="client"
      >
        <View.Port />
        <Preload all />
      </Canvas>
    </>
  );
}
