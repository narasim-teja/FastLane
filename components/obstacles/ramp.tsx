import React from "react";

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

export const Ramp = ({ position = [0, 0, 0] }) => {
  const { nodes, materials } = useGLTF("/models/obstacles/ramp.glb");
  return (
    <RigidBody type="fixed">
      <group rotation={[0.397, 0, 0]} position={position as Position}>
        <mesh
          geometry={nodes.Plane004.geometry}
          material={materials["Base.004"]}
        />
        <mesh
          geometry={nodes.Plane004_1.geometry}
          material={materials["Arrow.004"]}
        />
        <mesh
          geometry={nodes.Plane004_2.geometry}
          material={materials["Base.005"]}
        />
      </group>
    </RigidBody>
  );
};

useGLTF.preload("/models/obstacles/ramp.glb");
