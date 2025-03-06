import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export const EthText = ({ position = [0, 0, 0] }) => {
  const { nodes, materials } = useGLTF("/models/obstacles/eth-text.glb");
  return (
    <RigidBody type="fixed">
      <group
        position={[position[0], position[1] + 0.25, position[2]]}
        rotation={[1.5, 0, 0]}
        dispose={null}
      >
        <mesh
          geometry={nodes.Eth_Text.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </RigidBody>
  );
};

useGLTF.preload("/models/obstacles/eth-text.glb");
