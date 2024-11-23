import React from "react";

import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

import { useGame } from "~/hooks/use-game";

export const Track: React.FC<{
  length?: number;
  row: number;
}> = ({ length = 10, row }) => {
  const { nodes, materials } = useGLTF("/models/gold-track/track.glb");

  const { togglePause } = useGame();

  return (
    <RigidBody type="fixed" colliders="trimesh" restitution={0.2} friction={1}>
      <mesh
        geometry={nodes.Plane.geometry}
        material={materials["Gold Track v1"]}
        scale={[1.5, 1, 3.5]}
        position={[0, 0, -(25 * (row * 2 + 1))]}
      />

      <CuboidCollider
        // args={[2.5, 0, 2.5]}
        args={[2.5, 0, 2.5]}
        // restitution={0.2}
        restitution={0}
        friction={1}
        position={[2, 0.05, -(5 * length) + 2]}
        onCollisionEnter={() => togglePause()}
      />
    </RigidBody>
  );
};

useGLTF.preload("/models/gold-track/track.glb");
