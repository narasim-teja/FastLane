"use client";

import React from "react";

import { KeyboardControls as DrieKeyboardControls } from "@react-three/drei";

export enum Controls {
  forward = "forward",
  back = "backward",
  left = "leftward",
  right = "rightward",
  jump = "jump",
  panLeft = "panLeft",
  panRight = "panRight",
}

export const KeyboardControls = ({ children }: React.PropsWithChildren) => (
  <DrieKeyboardControls
    map={[
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: Controls.panLeft, keys: ["KeyZ"] },
      { name: Controls.panRight, keys: ["KeyX"] },
    ]}
  >
    {children}
  </DrieKeyboardControls>
);
