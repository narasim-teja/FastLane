import { RigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position as Position}>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        restitution={0.2}
        friction={1}
      >
        <mesh receiveShadow position={[0, -0.1, 0]}>
          <boxGeometry args={[5, 0.2, 5]} />
          <meshStandardMaterial color="limegreen" />
        </mesh>
      </RigidBody>
    </group>
  );
}
