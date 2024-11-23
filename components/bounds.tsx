import React from "react";

import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

import { useGame } from "~/hooks/use-game";

export const Bounds: React.FC<{
  length?: number;
  row: number;
  onCollison: () => void;
}> = ({ length = 10, onCollison, row }) => {
  const { nodes, materials } = useGLTF("/models/eth-track/track.glb");

  const { togglePause } = useGame();

  const handleCheckpointEnter = () => {
    togglePause();
    onCollison();
  };

  return (
    <RigidBody type="fixed" colliders="trimesh" restitution={0.2} friction={1}>
      <group
        scale={[1.065, 1, 6.275]}
        position={[0, 0.055, -24.25 * (2 * row + 1) - 1.5 * row]}
      >
        <mesh
          geometry={nodes.Cube013.geometry}
          material={materials["Material.001"]}
        />
        <mesh geometry={nodes.Cube013_1.geometry} material={materials.glow} />
      </group>

      <CuboidCollider
        // args={[2.5, 0, 2.5]}
        args={[2.5, 0, 2.5]}
        // restitution={0.2}
        restitution={0}
        friction={1}
        position={[2, 0.05, -(5 * length) + 2]}
        onCollisionEnter={handleCheckpointEnter}
      />
    </RigidBody>
  );
};

useGLTF.preload("/models/eth-track/track.glb");
