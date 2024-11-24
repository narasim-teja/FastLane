import * as React from "react";

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import type { GroupProps } from "@react-three/fiber";

export const CartesiModel: React.FC<GroupProps> = (props) => {
  const { nodes, materials } = useGLTF(
    "/models/community-tracks/cartesi/cartesi.gltf"
  );

  return (
    <group {...props} dispose={null}>
      <RigidBody type="fixed">
        <group
          position={[59.567, -68.04, 120.049]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={800}
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
          position={[71.417, -28.76, 114.63]}
          scale={800}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <group position={[59.264, 9.862, 119.771]} scale={800}>
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
        <group position={[-18.443, -11.504, 432.765]} scale={800}>
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
          position={[-253.146, -15.487, 42.023]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={800}
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
          position={[112.273, -15.514, -156.108]}
          rotation={[0, 0.21, 0]}
          scale={800}
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
          position={[-58.834, -12.922, -99.997]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_2.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-60.717, -12.922, -100.57]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_3.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-60.318, -12.922, -98.712]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_4.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-61.805, -12.922, -97.398]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_5.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-62.207, -12.922, -99.273]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_6.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-62.617, -12.922, -101.183]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_7.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-64.054, -12.922, -99.854]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_8.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-63.656, -12.922, -97.995]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_9.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-63.25, -12.922, -96.105]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_10.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-64.469, -12.922, -101.784]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_1001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-61.508, -12.922, -112.921]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_2001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-63.391, -12.922, -113.494]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_3001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-62.992, -12.922, -111.636]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_4001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-64.479, -12.922, -110.322]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_5001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-64.881, -12.922, -112.197]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_6001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-65.291, -12.922, -114.107]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_7001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-66.728, -12.922, -112.778]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_8001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-66.33, -12.922, -110.92]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_9001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-65.924, -12.922, -109.03]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_10001.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-67.143, -12.922, -114.708]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_1002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-64.088, -12.922, -124.941]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_2002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-65.971, -12.922, -125.514]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_3002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-65.572, -12.922, -123.656]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_4002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-67.059, -12.922, -122.342]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_5002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-67.461, -12.922, -124.217]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_6002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-67.871, -12.922, -126.127]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_7002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-69.308, -12.922, -124.797]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_8002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-68.91, -12.922, -122.939]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_9002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-68.504, -12.922, -121.049]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_10002.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-69.723, -12.922, -126.728]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_1003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-66.695, -12.922, -137.089]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_2003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-68.578, -12.922, -137.662]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_3003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-68.179, -12.922, -135.803]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_4003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-69.666, -12.922, -134.49]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_5003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-70.069, -12.922, -136.365]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_6003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-70.479, -12.922, -138.274]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_7003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-71.916, -12.922, -136.945]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_8003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-71.517, -12.922, -135.087]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_9003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-71.111, -12.922, -133.197]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Bowling_Pin_10003.geometry}
          material={materials["Bowling Pack Material"]}
          position={[-72.33, -12.922, -138.876]}
          rotation={[0, 0.211, 0]}
          scale={13.585}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[373.786, -9.632, 205.063]}
          rotation={[Math.PI, -0.213, Math.PI]}
          scale={[53.893, 68.473, 68.473]}
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
          position={[-204.018, 14.834, 349.468]}
          scale={800}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Plane007.geometry}
          material={nodes.Plane007.material}
          position={[262.26, 14.834, 425.769]}
          rotation={[0, -0.165, 0]}
          scale={800}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Plane008.geometry}
          material={nodes.Plane008.material}
          position={[348.623, 14.834, -102.737]}
          scale={800}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Plane009.geometry}
          material={nodes.Plane009.material}
          position={[-123.827, 14.834, -171.945]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={800}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <group position={[-4.22, 25.315, 141.132]} scale={800}>
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
        <group position={[0.057, 25.314, 146.873]} scale={800}>
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
        <group position={[5.627, 25.315, 152.218]} scale={800}>
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
        <group position={[12.04, 25.314, 156.944]} scale={800}>
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
        <group position={[59.577, -12.532, 120.522]} scale={800}>
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
          position={[59.704, 3.846, 119.512]}
          scale={800}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Cylinder032.geometry}
          material={materials["Material.005"]}
          position={[104.148, 23.355, 96.126]}
          scale={800}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Cylinder033.geometry}
          material={materials["Material.005"]}
          position={[107.476, 23.348, 113.547]}
          scale={800}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={nodes.Cylinder034.geometry}
          material={materials["Material.005"]}
          position={[107.581, 23.348, 113.736]}
          scale={800}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <group
          position={[59.555, 17.245, 120.06]}
          rotation={[0, 1.571, 0]}
          scale={800}
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
        <group position={[144.961, 19.833, 134.584]} scale={800}>
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
        <group position={[18.782, 25.314, 160.576]} scale={800}>
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
          position={[80.651, 25.315, 183.836]}
          rotation={[0, 1.571, 0]}
          scale={800}
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
          position={[86.391, 25.314, 179.559]}
          rotation={[0, 1.571, 0]}
          scale={800}
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
          position={[91.736, 25.315, 173.989]}
          rotation={[0, 1.571, 0]}
          scale={800}
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
          position={[96.462, 25.314, 167.575]}
          rotation={[0, 1.571, 0]}
          scale={800}
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
          position={[100.095, 25.314, 160.834]}
          rotation={[0, 1.571, 0]}
          scale={800}
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
          position={[123.354, 25.315, 98.965]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={800}
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
          position={[119.077, 25.314, 93.225]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={800}
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
          position={[113.507, 25.315, 87.879]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={800}
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
          position={[107.094, 25.314, 83.153]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={800}
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
          position={[100.353, 25.314, 79.521]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={800}
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
          position={[38.483, 25.315, 56.262]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={800}
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
          position={[32.743, 25.314, 60.538]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={800}
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
          position={[27.398, 25.315, 66.109]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={800}
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
          position={[22.672, 25.314, 72.522]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={800}
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
          position={[19.04, 25.314, 79.263]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={800}
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
          position={[61.041, -7.852, 3.568]}
          scale={800}
        />
      </RigidBody>
    </group>
  );
};

useGLTF.preload("/models/community-tracks/cartesi/cartesi.gltf");
