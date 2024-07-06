import { useFBX } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

import { useGame } from "~/hooks/use-game";
import { quantize } from "~/lib/utils";

type BoundsProps = {
  length?: number;
  rowCount: number;
  onCollison: () => void;
};

export function Bounds({ length = 10, onCollison, rowCount }: BoundsProps) {
  const corridor = useFBX("/road-plane.fbx");

  const { activatePause } = useGame();

  const boundPosition = rowCount / 10 - 1;

  const handleCheckpointEnter = () => {
    activatePause();
    onCollison();
  };

  // Quantizing scale and position values to 3 decimal places
  const scale = [0.014, 0.01, 0.0066 * length].map(quantize);
  // const position = [2, -0.21, -(2 * length) + 0.05].map(quantize);
  const position = [2, -0.2, -(2 * length) - 5.5 - 4.5 * boundPosition].map(
    quantize
  );

  return (
    <RigidBody type="fixed" colliders="trimesh" restitution={0.2} friction={1}>
      <primitive object={corridor} scale={scale} position={position} />
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
}

useFBX.preload("/road-plane.fbx");
