import * as React from "react";

import { useGLTF } from "@react-three/drei";

import type { GroupProps } from "@react-three/fiber";

export const CartesiModel: React.FC<GroupProps> = (props) => {
  const { nodes, materials } = useGLTF(
    "/models/community-tracks/cartesi-track.glb"
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        geometry={nodes.Landscape001.geometry}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        material={nodes.Landscape001.material}
      />
      <mesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        geometry={nodes.Cylinder005.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        geometry={nodes.Plane002.geometry}
        material={materials.PaletteMaterial001}
      />
      <group position={[0.097, 0.104, -0.086]} rotation={[0, -1.571, 0]}>
        <mesh
          // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
          geometry={nodes.Cylinder028.geometry}
          material={materials.PaletteMaterial003}
        />
        <mesh
          // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
          geometry={nodes.Cylinder028_1.geometry}
          material={materials["cARTESI lOGO"]}
        />
      </group>
      <mesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        geometry={nodes.Plane362003.geometry}
        material={materials.Material__3}
        position={[-0.16, 0.085, -0.342]}
        rotation={[0, 0.207, 0]}
      />
      <mesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        geometry={nodes.Object_2003.geometry}
        material={materials.defaultMat}
        position={[-0.191, 0.132, -0.226]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.771}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Object_0.geometry, materials.defaultMat, 3]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Object_0.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle002.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle002.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle003.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle003.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle004.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle004.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle005.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle005.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle006.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle006.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle007.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle007.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle008.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle008.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle009.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle009.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle010.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle010.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Circle011.geometry, materials["Bowling Pack Material"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Circle011.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Plane362.geometry, materials.Material__3, 3]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Plane362.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Plane362009.geometry, materials.Material__3, 73]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Plane362009.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube005.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube005.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube005_1.geometry, materials.Stone, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube005_1.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube005_2.geometry, materials.Scarf, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube005_2.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube005_3.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube005_3.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube005_4.geometry, materials.Hat, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube005_4.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube005_5.geometry, materials.PaletteMaterial002, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube005_5.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube027.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube027.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube027_1.geometry, materials.Stone, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube027_1.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube027_2.geometry, materials.Scarf, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube027_2.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube027_3.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube027_3.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube027_4.geometry, materials.Hat, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube027_4.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube027_5.geometry, materials.PaletteMaterial002, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube027_5.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube039.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube039.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube039_1.geometry, materials.Stone, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube039_1.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube039_2.geometry, materials.Scarf, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube039_2.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube039_3.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube039_3.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube039_4.geometry, materials.Hat, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube039_4.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube039_5.geometry, materials.PaletteMaterial002, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube039_5.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube051.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube051.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube051_1.geometry, materials.Stone, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube051_1.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube051_2.geometry, materials.Scarf, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube051_2.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube051_3.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube051_3.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube051_4.geometry, materials.Hat, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube051_4.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube051_5.geometry, materials.PaletteMaterial002, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube051_5.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder036.geometry, materials.PaletteMaterial001, 3]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder036.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder036_1.geometry, materials.PaletteMaterial001, 3]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder036_1.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder036_2.geometry, materials.PaletteMaterial001, 3]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder036_2.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070.geometry, materials.PaletteMaterial001, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_1.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_1.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_2.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_2.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_3.geometry, materials["cARTESI lOGO"], 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_3.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_4.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_4.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_5.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_5.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_6.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_6.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_7.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_7.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_8.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_8.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_9.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_9.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_10.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_10.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder070_11.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder070_11.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder073.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder073.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder073_1.geometry, materials["cARTESI lOGO"], 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder073_1.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder073_2.geometry, materials.PaletteMaterial003, 2]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder073_2.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder075.geometry, materials["cARTESI lOGO"], 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder075.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cylinder075_1.geometry, materials.PaletteMaterial003, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cylinder075_1.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube001.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube001.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube001_1.geometry, materials.Stone, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube001_1.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube001_2.geometry, materials.Scarf, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube001_2.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube001_3.geometry, materials.PaletteMaterial001, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube001_3.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube001_4.geometry, materials.Hat, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube001_4.instanceMatrix}
      />
      <instancedMesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        args={[nodes.Cube001_5.geometry, materials.PaletteMaterial002, 4]}
        // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
        instanceMatrix={nodes.Cube001_5.instanceMatrix}
      />
    </group>
  );
};

useGLTF.preload("/models/community-tracks/cartesi-track.glb");
