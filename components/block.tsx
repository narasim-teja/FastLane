import React from "react";

import { Text, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

import { useGame } from "~/hooks/use-game";

/* -----------------------------------------------------------------------------------------------
 * Eth Track Blocks
 * -----------------------------------------------------------------------------------------------*/
export const EthBlockEnd: React.FC<{
  position?: Position;
  checkpoint?: number;
}> = ({ position = [0, 0, 0], checkpoint }) => {
  const hascollided = React.useRef(false);

  const { nodes, materials } = useGLTF("/models/eth-track/checkpoint.glb");

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
        position={[0, 1, -2]}
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
        <mesh
          geometry={nodes.Gold_Track_Checkpoint.geometry}
          material={materials["Material.001"]}
        />
      </RigidBody>
    </group>
  );
};

export const EthStartingBlock: React.FC<{
  position?: Position;
}> = ({ position = [0, 0, 0] }) => {
  const { nodes, materials } = useGLTF("/models/eth-track/checkpoint.glb");

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
          geometry={nodes.Gold_Track_Checkpoint.geometry}
          material={materials["Material.001"]}
        />
      </RigidBody>
    </group>
  );
};

/* -----------------------------------------------------------------------------------------------
 * Golc Track Blocks
 * -----------------------------------------------------------------------------------------------*/

export const GoldBlockEnd: React.FC<{
  position?: Position;
}> = ({ position = [0, 0, 0] }) => {
  const hascollided = React.useRef(false);

  const { nodes, materials } = useGLTF("/models/gold-track/checkpoint.glb");

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
    <group scale={[1.5, 1, 1]} position={position as Position}>
      <Text
        font="/fonts/bebas-neue-v9-latin-regular.woff"
        scale={0.5}
        // position={[0, 1.25, 2]}
        position={[0, 1, -2]}
      >
        End
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
        <mesh
          geometry={nodes.Gold_Track_Checkpoint.geometry}
          material={materials["Material.001"]}
        />
      </RigidBody>
    </group>
  );
};

export const GoldStartingBlock: React.FC<{
  position?: Position;
}> = ({ position = [0, 0, 0] }) => {
  const { nodes, materials } = useGLTF("/models/gold-track/checkpoint.glb");

  return (
    <group scale={[1.5, 1, 1]} position={position as Position}>
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
          Start
          <meshBasicMaterial toneMapped={false} />
        </Text>

        <mesh
          geometry={nodes.Gold_Track_Checkpoint.geometry}
          material={materials["Material.001"]}
        />
      </RigidBody>
    </group>
  );
};

useGLTF.preload("/models/gold-track/checkpoint.glb");
