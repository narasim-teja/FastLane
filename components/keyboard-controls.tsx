"use client";

import React from "react";

import { KeyboardControls as DrieKeyboardControls } from "@react-three/drei";

export enum Controls {
  forward = "forward",
  back = "backward",
  left = "leftward",
  right = "rightward",
  jump = "jump",
  panUp = "panUp",
  panDown = "panDown",
  panLeft = "panLeft",
  panRight = "panRight",
  camera = "camera",
}

export const KeyboardControls = ({ children }: React.PropsWithChildren) => (
  <DrieKeyboardControls
    map={[
      { name: Controls.forward, keys: ["KeyW"] },
      { name: Controls.back, keys: ["KeyS"] },
      { name: Controls.left, keys: ["KeyA"] },
      { name: Controls.right, keys: ["KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: Controls.panUp, keys: ["ArrowUp"] },
      { name: Controls.panDown, keys: ["ArrowDown"] },
      { name: Controls.panLeft, keys: ["ArrowLeft"] },
      { name: Controls.panRight, keys: ["ArrowRight"] },
      { name: Controls.camera, keys: ["KeyK"] },
    ]}
  >
    {children}
  </DrieKeyboardControls>
);
