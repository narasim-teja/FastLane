"use client";

import React from "react";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import type { GroupProps } from "@react-three/fiber";
import type * as THREE from "three";

export const GamePlayModel: React.FC<GroupProps> = (props) => {
  const group = React.useRef<THREE.Group>(null);
  const light = React.useRef<THREE.DirectionalLight>(null);

  const { nodes, materials, animations } = useGLTF("/models/gameplay.glb");
  // @ts-expect-error ignore
  const { actions, names } = useAnimations(animations, group);

  useFrame((state) => {
    if (light.current) {
      light.current.position.z = state.camera.position.z + 1 - 4;
      light.current.target.position.z = state.camera.position.z - 4;
      light.current.target.updateMatrixWorld();
    }
  });

  React.useEffect(() => {
    actions[names[0]]?.play();
  }, [actions, names]);

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1.5} />
      <group name="Scene" ref={group} {...props}>
        <mesh
          name="TrafficCone"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone.geometry}
          material={materials.TrafficConeMat}
          position={[1.448, 0.227, -0.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone001"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone001.geometry}
          material={materials.TrafficConeMat}
          position={[-1.51, 0.227, 2.689]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone002"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone002.geometry}
          material={materials.TrafficConeMat}
          position={[-1.345, 0.227, -3.171]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone003"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone003.geometry}
          material={materials.TrafficConeMat}
          position={[-0.018, 0.227, -3.564]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone005"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone005.geometry}
          material={materials.TrafficConeMat}
          position={[1.493, 0.227, -1.364]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone006"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone006.geometry}
          material={materials.TrafficConeMat}
          position={[1.459, 0.227, 0.462]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone007"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone007.geometry}
          material={materials.TrafficConeMat}
          position={[1.526, 0.227, 2.014]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone008"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone008.geometry}
          material={materials.TrafficConeMat}
          position={[0.012, 0.227, 3.558]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone009"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone009.geometry}
          material={materials.TrafficConeMat}
          position={[-1.54, 0.227, -0.295]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone010"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone010.geometry}
          material={materials.TrafficConeMat}
          position={[-0.033, 0.227, 1.812]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone011"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone011.geometry}
          material={materials.TrafficConeMat}
          position={[-0.513, 0.227, -0.318]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone012"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone012.geometry}
          material={materials.TrafficConeMat}
          position={[-0.305, 0.227, -2.327]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone013"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone013.geometry}
          material={materials.TrafficConeMat}
          position={[-0.401, 0.227, -1.367]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone014"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone014.geometry}
          material={materials.TrafficConeMat}
          position={[-0.288, 0.227, 0.77]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone015"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone015.geometry}
          material={materials.TrafficConeMat}
          position={[-1.54, 0.227, 1.699]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone016"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone016.geometry}
          material={materials.TrafficConeMat}
          position={[-1.533, 0.227, -2.552]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone017"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone017.geometry}
          material={materials.TrafficConeMat}
          position={[-1.533, 0.227, -1.487]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone018"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone018.geometry}
          material={materials.TrafficConeMat}
          position={[-1.525, 0.227, 0.702]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone019"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone019.geometry}
          material={materials.TrafficConeMat}
          position={[1.436, 0.227, 2.914]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone020"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone020.geometry}
          material={materials.TrafficConeMat}
          position={[0.902, 0.227, -3.404]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone021"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone021.geometry}
          material={materials.TrafficConeMat}
          position={[1.51, 0.227, -2.095]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone022"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone022.geometry}
          material={materials.TrafficConeMat}
          position={[1.462, 0.227, 1.294]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone023"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone023.geometry}
          material={materials.TrafficConeMat}
          position={[-0.876, 0.227, 3.355]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone024"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone024.geometry}
          material={materials.TrafficConeMat}
          position={[-0.774, 0.227, -3.549]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone025"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone025.geometry}
          material={materials.TrafficConeMat}
          position={[1.528, 0.227, -2.848]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="TrafficCone026"
          castShadow
          receiveShadow
          geometry={nodes.TrafficCone026.geometry}
          material={materials.TrafficConeMat}
          position={[0.844, 0.227, 3.48]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <group name="BezierCurve" position={[0, 0.572, 0]} />
        <mesh
          name="Sphere"
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["cyberpunk.001"]}
          position={[-0.95, 0.572, 0.802]}
          rotation={[0, -0.033, 0]}
        />
        <mesh
          name="Base_Coin"
          castShadow
          receiveShadow
          geometry={nodes.Base_Coin.geometry}
          material={materials["Material.002"]}
          position={[0.75, 0.983, 1.95]}
          scale={0}
        />
        <group
          name="Retopo_Sheild"
          position={[1.133, 0.952, -1.672]}
          rotation={[0, -1.164, 0]}
          scale={0.363}
        >
          <mesh
            name="mesh"
            castShadow
            receiveShadow
            geometry={nodes.mesh.geometry}
            material={materials["Black Metal"]}
          />
          <mesh
            name="mesh_1"
            castShadow
            receiveShadow
            geometry={nodes.mesh_1.geometry}
            material={materials.Gold}
          />
          <mesh
            name="mesh_2"
            castShadow
            receiveShadow
            geometry={nodes.mesh_2.geometry}
            material={materials["Grey Meta"]}
          />
          <mesh
            name="mesh_3"
            castShadow
            receiveShadow
            geometry={nodes.mesh_3.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <mesh
          name="Circle"
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={materials["Material.003"]}
          position={[0.933, 0.971, -1.614]}
          scale={0}
        />
        <group name="Empty" position={[0.669, 2.319, 1.782]}>
          <mesh
            name="Circle001"
            castShadow
            receiveShadow
            geometry={nodes.Circle001.geometry}
            material={materials["Material.003"]}
            position={[0.264, -0.603, 0.164]}
            scale={0}
          />
        </group>
        <group name="Road_Plane_1">
          <mesh
            name="Cube001"
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials["cyberpunk.002"]}
          />
          <mesh
            name="Cube001_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials["glow.001"]}
          />
        </group>
      </group>
    </>
  );
};

useGLTF.preload("/models/gameplay.glb");
