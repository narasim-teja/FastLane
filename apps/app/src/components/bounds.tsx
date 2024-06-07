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
  const scale = [quantize(0.014), quantize(0.01), quantize(0.00668 * length)];
  const position = [
    quantize(2),
    quantize(-0.21),
    quantize(-(2 * length) + 0.05),
  ];

  return (
    <RigidBody type="fixed" colliders="trimesh" restitution={0.2} friction={1}>
      <primitive object={corridor} scale={scale} position={position} />
      <CuboidCollider
        args={[2.5, 0, 2.5]}
        position={[2, 0, -(5 * length) + 2]}
        restitution={0.2}
        friction={1}
        onCollisionEnter={handleCheckpointEnter}
      />
    </RigidBody>
  );
}

useFBX.preload("/road-plane.fbx");
