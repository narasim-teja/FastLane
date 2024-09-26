"use client";

import React from "react";

import { useGLTF } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";

import type { GroupProps } from "@react-three/fiber";

import { Multiplayer } from "~/components/players/multiplayer";
import { getLogger } from "~/lib/logger";
import { api } from "~/lib/trpc/react";

export const CommunityTrack: React.FC<GroupProps & { address?: string }> = ({
  address,
  ...props
}) => {
  const logger = getLogger();

  const [totalPlayers, setTotalPlayer] = React.useState(0);
  const { nodes, materials } = useGLTF("/community-track.glb");

  const { debugPhysics } = useControls("Debug Tools", {
    debugPhysics: false,
  });

  const { mutate: addPlayer } = api.ws.addPlayer.useMutation();

  api.ws.onBroadcastPosition.useSubscription(void function () {}, {
    onStarted: () => {
      logger.info(">>> Adding Player");
      addPlayer(address ?? Math.random().toString(36).substring(7));
    },
    onData: ({ data: { playersCount, address, impulse, torque } }) => {
      setTotalPlayer(playersCount);
      console.log({ playersCount, address, impulse, torque });
    },
  });

  return (
    <Physics debug={debugPhysics} colliders="trimesh">
      <group {...props}>
        <RigidBody type="fixed">
          <group
            position={[-57.054, -0.412, 64.566]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            {/* floor */}
            <mesh
              // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
              geometry={nodes.Cube032.geometry}
              material={materials.plane}
            />

            {/* race track */}
            <mesh
              // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
              geometry={nodes.Cube032_1.geometry}
              material={materials["gree.002"]}
            />

            {/* every other thing on the floor */}
            <mesh
              // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
              geometry={nodes.Cube032_2.geometry}
              material={materials.PaletteMaterial001}
            />
          </group>
        </RigidBody>

        {/* buildings */}
        <RigidBody type="fixed">
          <mesh
            // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
            geometry={nodes.Cube005_Cube002.geometry}
            material={materials["Material.011"]}
            position={[-116.09, 9.241, -34.547]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.177}
          />
        </RigidBody>

        {/* dont know what it is */}
        <mesh
          // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
          geometry={nodes.Cube_Cube002.geometry}
          material={materials.PaletteMaterial002}
          position={[-8.812, 0.823, 86.826]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.177}
        />

        {/* trees */}
        <RigidBody type="fixed">
          <mesh
            // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
            geometry={nodes.Cylinder.geometry}
            material={materials["Material.001"]}
            position={[-121.457, 0, -7.232]}
            scale={0.365}
          />
        </RigidBody>

        <mesh
          // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
          geometry={nodes["Academy_White@2x"].geometry}
          material={materials["Academy White@2x"]}
          position={[-45.256, 20.77, 70.405]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.883}
        />

        {/* oasis logo */}
        <RigidBody type="fixed" position={[10.54, -0.62, 6.678]}>
          <mesh
            // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
            geometry={nodes["Oasis_Logo_White@2x"].geometry}
            material={materials["Oasis Logo White@2x"]}
            scale={2.058}
          />
        </RigidBody>

        {/* oasis logo edges */}
        <RigidBody type="fixed">
          <mesh
            // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
            geometry={nodes.Cube.geometry}
            // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'.
            material={nodes.Cube.material}
            position={[10.54, -0.501, 6.781]}
          />
        </RigidBody>

        {/* rose collectible */}
        <RigidBody type="fixed">
          <mesh
            // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
            geometry={nodes.Rose.geometry}
            material={materials["49"]}
            position={[-44.246, 1.803, 80.744]}
            scale={1.818}
          />
        </RigidBody>

        {/* jump ramp  */}
        <RigidBody type="fixed">
          <group position={[-44.482, -0.016, 118.343]} scale={2.617}>
            <mesh
              // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
              geometry={nodes.Plane009_1.geometry}
              material={materials["Material.023"]}
            />
            <mesh
              // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
              geometry={nodes.Plane009_2.geometry}
              material={materials["Material.022"]}
            />
            <mesh
              // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
              geometry={nodes.Plane009_3.geometry}
              material={materials.PaletteMaterial001}
            />
          </group>
        </RigidBody>
      </group>

      {Array.from({ length: totalPlayers }).map((_, i) => (
        <Multiplayer key={i} address={address!} />
      ))}
    </Physics>
  );
};

useGLTF.preload("/community-track.glb");
