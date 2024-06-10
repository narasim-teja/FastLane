import React from "react";

import { useFBX } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";
import { useGame } from "~/hooks/use-game";
import { logger, quantize } from "~/lib/utils";

export function WhaleObstacle({ position = [0, 0, 0] }) {
  const [isGameReady, setGameReady] = React.useState(false);

  const whale = useFBX("/gold-coin-raised.fbx");

  const { activateSpeedBoost } = useGame();

  React.useEffect(() => {
    const timer = setTimeout(() => setGameReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCollisionExit = () => {
    if (isGameReady) {
      logger(">> Activating speed boost");
      activateSpeedBoost();
    }
  };

  // Apply quantization to position and scale
  const quantizedPosition = position.map(quantize);
  const quantizedScale = quantize(0.007);

  return (
    <group position={quantizedPosition as Position}>
      <RigidBody
        colliders="hull"
        // restitution={0.2}
        restitution={0}
        friction={1}
        onCollisionExit={handleCollisionExit}
      >
        <primitive
          object={whale}
          scale={quantizedScale}
          position={[-2, 0, 0].map(quantize)}
        />
      </RigidBody>
    </group>
  );
}

useFBX.preload("/gold-coin-raised.fbx");
