import { useFBX } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

import { useGame } from "~/hooks/use-game";
import { quantize } from "~/lib/utils";

type BoundsProps = {
  length?: number;
  onClick: () => void;
};

export function Bounds({ length = 9, onClick }: BoundsProps) {
  const corridor = useFBX("/road-plane.fbx");

  const { activatePause } = useGame();

  const handleCheckpointEnter = () => {
    activatePause();
    onClick();
  };

  // Quantizing scale and position values to 3 decimal places
  const scale = [0.014, 0.01, 0.00668 * length].map(quantize);
  // const position = [2, -0.21, -(2 * length) + 0.05].map(quantize);
  const position = [2, -0.2, -(2 * length) + 0].map(quantize);

  return (
    <RigidBody type="fixed" colliders="trimesh" restitution={0.2} friction={1}>
      <primitive object={corridor} scale={scale} position={position} />
      <CuboidCollider
        // args={[2.5, 0, 2.5]}
        args={[2, 0, 2]}
        // restitution={0.2}
        restitution={0}
        friction={1}
        position={[2, 0, -(5 * length) + 2]}
        onCollisionEnter={handleCheckpointEnter}
      />
    </RigidBody>
  );
}

useFBX.preload("/road-plane.fbx");
