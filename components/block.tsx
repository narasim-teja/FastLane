import React from "react";

import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

import { useGame } from "~/hooks/use-game";

type BlockProps = {
  position?: Position;
  checkpoint?: number;
};

export function BlockEnd({ position = [0, 0, 0], checkpoint }: BlockProps) {
  const hascollided = React.useRef(false);

  const { phase, resetStartTime } = useGame();

  function handleCollision() {
    if (!hascollided.current) {
      resetStartTime();
      hascollided.current = true;
    }
  }

  React.useEffect(() => {
    hascollided.current = false;
  }, [phase]);

  return (
    <group position={position as Position}>
      <Text
        font="/fonts/bebas-neue-v9-latin-regular.woff"
        scale={0.5}
        // position={[0, 1.25, 2]}
        position={[2, 1, 2]}
      >
        Checkpoint {checkpoint}
        <meshBasicMaterial toneMapped={false} />
      </Text>

      <RigidBody
        type="fixed"
        colliders="trimesh"
        // restitution={0.2}
        restitution={0}
        friction={1}
        onCollisionEnter={handleCollision}
      >
        <mesh receiveShadow position={[2, 0, 2]}>
          <boxGeometry
            // args={[5, 0.1, 5]}
            args={[5, 0, 5]}
          />
          <meshStandardMaterial color="limegreen" />
        </mesh>
      </RigidBody>
    </group>
  );
}

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position as Position}>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        // restitution={0.2}
        restitution={0}
        friction={1}
      >
        <Text
          font="/fonts/bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          // position={[0, 1.25, 2]}
          position={[0, 1, -2]}
        >
          Checkpoint 1
          <meshBasicMaterial toneMapped={false} />
        </Text>

        <mesh
          receiveShadow
          //  position={[0, -0.1, 0]}
          position={[0, 0, 0]}
        >
          <boxGeometry
            // args={[5, 0.2, 5]}
            args={[5, 0, 5]}
          />
          <meshStandardMaterial color="limegreen" />
        </mesh>
      </RigidBody>
    </group>
  );
}
