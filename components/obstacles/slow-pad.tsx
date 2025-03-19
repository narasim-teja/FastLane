import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import { useGame } from "~/hooks/use-game";
import { getLogger } from "~/lib/logger";

const logger = getLogger();

export const SlowPad = ({ position = [0, 0, 0] }) => {
  const { activateSpeedReduced } = useGame();
  const { nodes, materials } = useGLTF("/models/obstacles/slow-pad.glb");

  const handleCollisionEnter = () => {
    logger.info(">>> activating speed reduction");
    activateSpeedReduced();
  };

  return (
    <RigidBody type="fixed" onCollisionEnter={handleCollisionEnter}>
      <group
        position={[position[0], position[1] + 0.075, position[2]]}
        dispose={null}
      >
        <mesh
          geometry={nodes.Plane.geometry}
          material={materials["Base.001"]}
        />
        <mesh
          geometry={nodes.Plane_1.geometry}
          material={materials["Arrow.001"]}
        />
      </group>
    </RigidBody>
  );
};

useGLTF.preload("/models/obstacles/slow-pad.glb");
