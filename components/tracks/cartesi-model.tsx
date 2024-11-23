import * as React from "react";

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { GroupProps } from "@react-three/fiber";

export const CartesiModel: React.FC<GroupProps> = (props) => {
  const { nodes, materials } = useGLTF(
    "/models/community-tracks/cartesi/cartesi.gltf"
  );

  return (
    <group {...props}>
      <RigidBody type="fixed">
        <group
          position={[-0.036, -0.847, 0.004]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Object_2002.geometry}
            material={materials.defaultMat}
            position={[0.006, -0.044, 0.142]}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Landscape001.geometry}
          material={materials["Material.003"]}
          position={[0.112, -0.356, -0.063]}
          scale={100}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <group position={[-0.04, 0.127, 0.001]} scale={100}>
          <mesh
            geometry={nodes.Cylinder005_1.geometry}
            material={materials["Material.005"]}
          />
          <mesh
            geometry={nodes.Cylinder005_2.geometry}
            material={materials["Material.006"]}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <group position={[-1.011, -0.14, 3.913]} scale={100}>
          <mesh
            geometry={nodes.Plane003_1.geometry}
            material={materials["Material.009"]}
          />
          <mesh
            geometry={nodes.Plane003_2.geometry}
            material={materials["Material.010"]}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <group
          position={[-3.945, -0.19, -0.971]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Plane006_1.geometry}
            material={materials["Material.009"]}
          />
          <mesh
            geometry={nodes.Plane006_2.geometry}
            material={materials["Material.010"]}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.623, -0.191, -3.448]}
          rotation={[0, 0.21, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Plane007_1.geometry}
            material={materials["Material.010"]}
          />
          <mesh
            geometry={nodes.Plane007_2.geometry}
            material={materials["Material.012"]}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_1.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.516, -0.158, -2.746]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_2.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.54, -0.158, -2.753]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_3.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.535, -0.158, -2.73]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_4.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.553, -0.158, -2.714]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_5.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.558, -0.158, -2.737]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_6.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.563, -0.158, -2.761]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_7.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.581, -0.158, -2.744]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_8.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.576, -0.158, -2.721]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_9.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.571, -0.158, -2.698]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_10.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.587, -0.158, -2.769]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_1001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.55, -0.158, -2.908]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_2001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.573, -0.158, -2.915]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_3001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.568, -0.158, -2.892]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_4001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.587, -0.158, -2.875]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_5001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.592, -0.158, -2.899]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_6001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.597, -0.158, -2.923]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_7001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.615, -0.158, -2.906]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_8001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.61, -0.158, -2.883]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_9001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.605, -0.158, -2.859]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_10001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.62, -0.158, -2.93]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_1002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.582, -0.158, -3.058]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_2002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.605, -0.158, -3.065]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_3002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.6, -0.158, -3.042]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_4002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.619, -0.158, -3.026]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_5002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.624, -0.158, -3.049]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_6002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.629, -0.158, -3.073]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_7002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.647, -0.158, -3.056]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_8002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.642, -0.158, -3.033]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_9002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.637, -0.158, -3.009]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_10002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.652, -0.158, -3.08]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_1003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.614, -0.158, -3.21]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_2003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.638, -0.158, -3.217]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_3003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.633, -0.158, -3.194]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_4003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.652, -0.158, -3.177]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_5003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.657, -0.158, -3.201]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_6003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.662, -0.158, -3.225]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_7003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.68, -0.158, -3.208]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_8003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.675, -0.158, -3.185]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_9003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.67, -0.158, -3.161]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_10003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-1.685, -0.158, -3.232]}
          rotation={[0, 0.211, 0]}
          scale={0.17}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <group
          position={[3.892, -0.117, 1.067]}
          rotation={[Math.PI, -0.213, Math.PI]}
          scale={[0.674, 0.856, 0.856]}
        >
          <mesh
            geometry={nodes.Plane002_1.geometry}
            material={materials["Material.002"]}
          />
          <mesh
            geometry={nodes.Plane002_2.geometry}
            material={materials["Material.008"]}
          />
          <mesh
            geometry={nodes.Plane002_3.geometry}
            material={materials["Material.001"]}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Plane003.geometry}
          material={nodes.Plane003.material}
          position={[-3.331, 0.189, 2.872]}
          scale={100}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Plane007.geometry}
          material={nodes.Plane007.material}
          position={[2.498, 0.189, 3.826]}
          rotation={[0, -0.165, 0]}
          scale={100}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Plane008.geometry}
          material={nodes.Plane008.material}
          position={[3.577, 0.189, -2.781]}
          scale={100}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Plane009.geometry}
          material={nodes.Plane009.material}
          position={[-2.329, 0.189, -3.646]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={100}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <group position={[-0.833, 0.32, 0.268]} scale={100}>
          <mesh
            geometry={nodes.Cube005_1.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube005_2.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube005_3.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube005_4.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube005_5.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube005_6.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <group position={[-0.78, 0.32, 0.34]} scale={100}>
          <mesh
            geometry={nodes.Cube027.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube027_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube027_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube027_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube027_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube027_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <group position={[-0.71, 0.32, 0.406]} scale={100}>
          <mesh
            geometry={nodes.Cube039.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube039_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube039_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube039_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube039_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube039_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <group position={[-0.63, 0.32, 0.465]} scale={100}>
          <mesh
            geometry={nodes.Cube051.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube051_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube051_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube051_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube051_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube051_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <group position={[-0.036, -0.153, 0.01]} scale={100}>
          <mesh
            geometry={nodes.Cylinder023_1.geometry}
            material={materials["Material.005"]}
          />
          <mesh
            geometry={nodes.Cylinder023_2.geometry}
            material={materials["Material.004"]}
          />
          <mesh
            geometry={nodes.Cylinder023_3.geometry}
            material={materials["Top Screen"]}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Cylinder029.geometry}
          material={materials["Material.005"]}
          position={[-0.034, 0.051, -0.002]}
          scale={100}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Cylinder032.geometry}
          material={materials["Material.005"]}
          position={[0.521, 0.295, -0.295]}
          scale={100}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Cylinder033.geometry}
          material={materials["Material.005"]}
          position={[0.563, 0.295, -0.077]}
          scale={100}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Cylinder034.geometry}
          material={materials["Material.005"]}
          position={[0.564, 0.295, -0.075]}
          scale={100}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <group
          position={[-0.036, 0.219, 0.004]}
          rotation={[0, 1.571, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cylinder070.geometry}
            material={materials["Material.005"]}
          />
          <mesh
            geometry={nodes.Cylinder070_1.geometry}
            material={materials["T_B2windows.001"]}
          />
          <mesh
            geometry={nodes.Cylinder070_2.geometry}
            material={materials["T_B2base_gray.001"]}
          />
          <mesh
            geometry={nodes.Cylinder070_3.geometry}
            material={materials["cARTESI lOGO"]}
          />
          <mesh
            geometry={nodes.Cylinder070_4.geometry}
            material={materials["T_B3base_gray.001"]}
          />
          <mesh
            geometry={nodes.Cylinder070_5.geometry}
            material={materials["T_B5base_gray.001"]}
          />
          <mesh
            geometry={nodes.Cylinder070_6.geometry}
            material={materials["T_B2base_white.001"]}
          />
          <mesh
            geometry={nodes.Cylinder070_7.geometry}
            material={materials["T_B6base_white.001"]}
          />
          <mesh
            geometry={nodes.Cylinder070_8.geometry}
            material={materials["T_B6windows.001"]}
          />
          <mesh
            geometry={nodes.Cylinder070_9.geometry}
            material={materials["T_B5base_white.001"]}
          />
          <mesh
            geometry={nodes.Cylinder070_10.geometry}
            material={materials["T_B4base_white.001"]}
          />
          <mesh
            geometry={nodes.Cylinder070_11.geometry}
            material={materials["T_B1base_white.001"]}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <group position={[1.031, 0.251, 0.186]} scale={100}>
          <mesh
            geometry={nodes.Cylinder072.geometry}
            material={materials["T_B2windows.001"]}
          />
          <mesh
            geometry={nodes.Cylinder072_1.geometry}
            material={materials["cARTESI lOGO"]}
          />
          <mesh
            geometry={nodes.Cylinder072_2.geometry}
            material={materials["T_B3base_gray.001"]}
          />
          <mesh
            geometry={nodes.Cylinder072_3.geometry}
            material={materials["T_B5base_gray.001"]}
          />
          <mesh
            geometry={nodes.Cylinder072_4.geometry}
            material={materials["T_B2base_white.001"]}
          />
          <mesh
            geometry={nodes.Cylinder072_5.geometry}
            material={materials["T_B1base_white.001"]}
          />
        </group>
      </RigidBody>

      <RigidBody type="fixed">
        <group position={[-0.546, 0.32, 0.511]} scale={100}>
          <mesh
            geometry={nodes.Cube001_1.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube001_2.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube001_3.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube001_4.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube001_5.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube001_6.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.227, 0.32, 0.802]}
          rotation={[0, 1.571, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube002_1.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube002_2.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube002_3.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube002_4.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube002_5.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube002_6.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.299, 0.32, 0.748]}
          rotation={[0, 1.571, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube003_1.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube003_2.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube003_3.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube003_4.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube003_5.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube003_6.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.366, 0.32, 0.679]}
          rotation={[0, 1.571, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube004_1.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube004_2.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube004_3.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube004_4.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube004_5.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube004_6.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.425, 0.32, 0.598]}
          rotation={[0, 1.571, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube245.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube245_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube245_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube245_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube245_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube245_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.47, 0.32, 0.514]}
          rotation={[0, 1.571, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube246.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube246_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube246_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube246_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube246_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube246_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.761, 0.32, -0.259]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube247.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube247_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube247_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube247_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube247_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube247_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.708, 0.32, -0.331]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube248.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube248_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube248_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube248_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube248_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube248_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.638, 0.32, -0.398]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube249.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube249_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube249_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube249_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube249_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube249_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.558, 0.32, -0.457]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube250.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube250_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube250_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube250_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube250_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube250_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[0.474, 0.32, -0.502]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube251.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube251_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube251_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube251_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube251_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube251_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[-0.3, 0.32, -0.793]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube252.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube252_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube252_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube252_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube252_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube252_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[-0.371, 0.32, -0.74]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube253.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube253_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube253_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube253_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube253_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube253_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[-0.438, 0.32, -0.67]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube254.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube254_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube254_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube254_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube254_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube254_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[-0.497, 0.32, -0.59]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube255.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube255_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube255_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube255_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube255_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube255_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[-0.543, 0.32, -0.506]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cube256.geometry}
            material={materials["Snow.001"]}
          />
          <mesh
            geometry={nodes.Cube256_1.geometry}
            material={materials.Stone}
          />
          <mesh
            geometry={nodes.Cube256_2.geometry}
            material={materials.Scarf}
          />
          <mesh
            geometry={nodes.Cube256_3.geometry}
            material={materials.Carrot}
          />
          <mesh geometry={nodes.Cube256_4.geometry} material={materials.Hat} />
          <mesh
            geometry={nodes.Cube256_5.geometry}
            material={materials.Wood2}
          />
        </group>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Plane362027.geometry}
          material={materials.Material__3}
          position={[-0.018, -0.095, -1.452]}
          scale={100}
        />
      </RigidBody>
    </group>
  );
};

useGLTF.preload("/models/community-tracks/cartesi/cartesi.gltf");
