import React from "react";

import { useFBX } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

import { useGame } from "~/hooks/use-game";
import { getLogger } from "~/lib/logger";

export function PoopObstacle({ position = [0, 0, 0] }) {
  const logger = getLogger();

  const poop = useFBX("/poop.fbx");

  const { activateSpeedReduced } = useGame();

  const handleCollisionExit = () => {
    logger.info(">>> activating speed reduction");
    activateSpeedReduced();
  };

  return (
    <group position={position as Position}>
      <RigidBody
        colliders="hull"
        // restitution={0.2}
        restitution={0}
        friction={1}
        onCollisionExit={handleCollisionExit}
      >
        <primitive
          object={poop}
          scale={0.007} // NOTE: scale down the model
          // position={[0, 0.8, 1.6]}
          position={[0, 1, 1]}
          rotation-x={-Math.PI / 2}
        />
      </RigidBody>
    </group>
  );
}

useFBX.preload("/poop.fbx");
