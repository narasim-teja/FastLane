import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export const OasisText = ({ position = [0, 0, 0] }) => {
  const { nodes, materials } = useGLTF("/models/obstacles/oasis-text.glb");
  return (
    <RigidBody type="fixed">
      <group
        position={[position[0], position[1] + 0.4, position[2]]}
        rotation={[1.5, 0, 0]}
      >
        <mesh
          geometry={nodes.Oasis_Text.geometry}
          material={materials["Material.002"]}
        />
      </group>
    </RigidBody>
  );
};

useGLTF.preload("/models/obstacles/oasis-text.glb");
