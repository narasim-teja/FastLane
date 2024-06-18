import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

export function BlockEnd({ position = [0, 0, 0] }) {
  return (
    <group position={position as Position}>
      <Text
        font="/fonts/bebas-neue-v9-latin-regular.woff"
        scale={1}
        // position={[0, 1.25, 2]}
        position={[0, 1, 2]}
      >
        Checkpoint
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh receiveShadow position={[2, 0, 2]}>
        <boxGeometry
          // args={[5, 0.1, 5]}
          args={[5, 0, 5]}
        />
        <meshStandardMaterial color="limegreen" />
      </mesh>
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
