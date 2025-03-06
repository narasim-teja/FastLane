import * as React from "react";

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import { useGame } from "~/hooks/use-game";
import { getLogger } from "~/lib/logger";

const logger = getLogger();

export const SpeedPad = ({ position = [0, 0, 0] }) => {
  const { activateSpeedBoost } = useGame();
  const { nodes, materials } = useGLTF("/models/obstacles/speed-pad.glb");

  const handleCollisionEnter = () => {
    logger.info(">>> activating speed boost");
    activateSpeedBoost();
  };

  return (
    <RigidBody type="fixed" onCollisionEnter={handleCollisionEnter}>
      <group
        position={[position[0], position[1] + 0.075, position[2]]}
        scale={0.75}
      >
        <mesh geometry={nodes.Plane002.geometry} material={materials.Base} />
        <mesh geometry={nodes.Plane002_1.geometry} material={materials.Arrow} />
      </group>
    </RigidBody>
  );
};
