import React from "react";

import { useFBX } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { RapierRigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

export function TextObstacle({ position = [0, 0, 0] }) {
  const ref = React.useRef<RapierRigidBody>(null);

  const wagmi = useFBX("/wagmi-sml.fbx");

  // useFrame((state) => {
  //   if (ref.current) {
  //     const time = state.clock.getElapsedTime();
  //     const x = Math.sin(time) * 1.1;

  //     ref.current.setNextKinematicTranslation({
  //       x: position[0] + x,
  //       y: position[1] + 0.5,
  //       z: position[2],
  //     });
  //   }
  // });

  return (
    <group position={position as Position}>
      {/* <mesh receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[5, 0.2, 5]} />
        <meshStandardMaterial color="greenyellow" />
      </mesh> */}

      <RigidBody
        ref={ref}
        type="kinematicPosition"
        // restitution={0.2}
        restitution={0}
        friction={0}
      >
        <primitive
          object={wagmi}
          scale={0.01}
          // position={[-1.6, 0.25, 0]}
          position={[-1, 0, 0]}
        />
      </RigidBody>
    </group>
  );
}

useFBX.preload("/wagmi-sml.fbx");
