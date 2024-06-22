"use client";

import React from "react";

import { Preload, Stats, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import type { CanvasProps } from "@react-three/fiber";

type SceneProps = Omit<CanvasProps, "children">;

export default function Scene(props: SceneProps) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas shadows {...props} eventSource={document.body} eventPrefix="client">
      <View.Port />
      <Preload all />
      <Stats />
    </Canvas>
  );
}
