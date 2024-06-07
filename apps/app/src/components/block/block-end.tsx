import { Text } from "@react-three/drei";

import type { Position } from "~/types/misc";

export function BlockEnd({ position = [0, 0, 0] }) {
  return (
    <group position={position as Position}>
      <Text
        font="/bebas-neue-v9-latin-regular.woff"
        scale={1}
        position={[0, 1.25, 2]}
      >
        Checkpoint
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh receiveShadow position={[2, 0, 2]}>
        <boxGeometry args={[5, 0.1, 5]} />
        <meshStandardMaterial color="limegreen" />
      </mesh>
    </group>
  );
}
