import React from "react";

import { useFBX } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";
import { useGame } from "~/hooks/use-game";

export function PoopObstacle({ position = [0, 0, 0] }) {
  const [isGameReady, setGameReady] = React.useState(false);

  const poop = useFBX("/poop.fbx");

  const { activateSpeedReduced } = useGame();

  React.useEffect(() => {
    const timer = setTimeout(() => setGameReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCollisionExit = () => {
    if (isGameReady) {
      console.log(">>> activating speed reduction");
      activateSpeedReduced();
    }
  };

  return (
    <group position={position as Position}>
      <RigidBody
        colliders="hull"
        restitution={0.2}
        friction={1}
        onCollisionExit={handleCollisionExit}
      >
        <primitive
          object={poop}
          scale={0.007}
          position={[0, 0.8, 1.6]}
          rotation-x={-Math.PI / 2}
        />
      </RigidBody>
    </group>
  );
}

useFBX.preload("/poop.fbx");
