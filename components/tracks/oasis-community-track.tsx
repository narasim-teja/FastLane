"use client";

import * as React from "react";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Environment, Html, useGLTF, useTexture } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import * as THREE from "three";

import type { GroupProps } from "@react-three/fiber";

import type { Clients, Position } from "~/types/misc";

import { Multiplayer } from "~/components/players/multiplayer";
import { api } from "~/lib/trpc/react";

export const OasisCommunityTrack: React.FC<
  GroupProps & { links: [string, string, string, string] }
> = ({ links, ...props }) => {
  const [clients, setClients] = React.useState<Clients>({});

  const { primaryWallet } = useDynamicContext();
  const address = primaryWallet?.address ?? "";

  const { nodes, materials } = useGLTF(
    "/models/community-tracks/oasis-track.glb"
  );
  const roadTexture = useTexture("/textures/road.jpg", (texture) => {
    // flip the texture
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(-1, 1);
  });

  const { debugPhysics } = useControls("Debug Tools", {
    debugPhysics: false,
  });

  const { mutate: broadcastPosition } = api.ws.broadcastPosition.useMutation();

  api.ws.onBroadcastPosition.useSubscription(void function () {}, {
    onStarted: () => {
      console.log("broadcastPosition started");
      broadcastPosition({
        address,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      });
    },
    onData: ({ data: { address, position, rotation } }) => {
      setClients((prev) => ({ ...prev, [address]: { position, rotation } }));
    },
  });

  const playersCount = Object.keys(clients).length;

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
              geometry={nodes.Cube032.geometry}
              material={materials.plane}
              material-map={roadTexture}
            />

            {/* race track */}
            <mesh
              geometry={nodes.Cube032_1.geometry}
              material={materials["gree.002"]}
            />

            {/* every other thing on the floor */}
            <mesh
              geometry={nodes.Cube032_2.geometry}
              material={materials.PaletteMaterial001}
            />
          </group>
        </RigidBody>

        {/* buildings */}
        <RigidBody type="fixed">
          <mesh
            geometry={nodes.Cube005_Cube002.geometry}
            material={materials["Material.011"]}
            position={[-116.09, 9.241, -34.547]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.177}
          />
        </RigidBody>

        {/* dont know what it is */}
        <mesh
          geometry={nodes.Cube_Cube002.geometry}
          material={materials.PaletteMaterial002}
          position={[-8.812, 0.823, 86.826]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.177}
        />

        {/* trees */}
        <RigidBody type="fixed">
          <mesh
            geometry={nodes.Cylinder.geometry}
            material={materials["Material.001"]}
            position={[-121.457, 0, -7.232]}
            scale={0.365}
          />
        </RigidBody>

        <mesh
          geometry={nodes["Academy_White@2x"].geometry}
          material={materials["Academy White@2x"]}
          position={[-45.256, 20.77, 70.405]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.883}
        />

        {/* oasis logo */}
        <RigidBody type="fixed" position={[10.54, -0.62, 6.678]}>
          <mesh
            geometry={nodes["Oasis_Logo_White@2x"].geometry}
            material={materials["Oasis Logo White@2x"]}
            scale={2.058}
          />
        </RigidBody>

        {/* oasis logo edges */}
        <RigidBody type="fixed">
          <mesh
            geometry={nodes.Cube.geometry}
            material={nodes.Cube.material}
            position={[10.54, -0.501, 6.781]}
          />
        </RigidBody>

        {/* rose collectible */}
        <RigidBody type="fixed">
          <mesh
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
              geometry={nodes.Plane009_1.geometry}
              material={materials["Material.023"]}
            />
            <mesh
              geometry={nodes.Plane009_2.geometry}
              material={materials["Material.022"]}
            />
            <mesh
              geometry={nodes.Plane009_3.geometry}
              material={materials.PaletteMaterial001}
            />
          </group>
        </RigidBody>

        <Environment preset="park" background />

        {/* iFrames */}
        <Html
          transform
          position={[46.65, 7.18, -16.86]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <iframe
            width="1020"
            height="573"
            src={links[0]}
            className="rounded-lg"
          />
        </Html>

        <Html
          occlude="blending"
          transform
          position={[20.58, 7, 105.44]}
          rotation={[0, -Math.PI, 0]}
        >
          <iframe
            width="980"
            height="540"
            src={links[1]}
            className="rounded-lg"
          />
        </Html>

        <Html transform position={[-56.86, 2.48, -48.98]}>
          <iframe
            width="375"
            height="220"
            src={links[2]}
            className="rounded-lg"
          />
        </Html>

        <Html
          transform
          position={[-94.28, 3.77, 122.38]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <iframe
            width="660"
            height="370"
            src={links[3]}
            className="rounded-lg"
          />
        </Html>
      </group>

      {Object.keys(clients).map((clientAddress) => {
        if (clientAddress === address) {
          const x = Math.floor((playersCount - 1) / 6) * 5;
          const z = (playersCount % 6 || 6) * 5;

          const position: Position = [-7.2 + x, 0.09, -(1.16 + z)];

          return (
            <Multiplayer
              key={clientAddress}
              address={address}
              position={position}
              geometry={nodes.Icosphere.geometry}
              material={materials["Material.026"]}
            />
          );
        }

        const { position, rotation } = clients[clientAddress];

        return (
          <RigidBody
            key={clientAddress}
            canSleep={false}
            colliders="ball"
            restitution={0.2}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
            position={[position.x, position.y, position.z]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={0.9}
          >
            <mesh
              geometry={nodes.Icosphere.geometry}
              material={materials["Material.026"]}
            />
          </RigidBody>
        );
      })}
    </Physics>
  );
};

useGLTF.preload("/models/community-tracks/oasis-track.glb");
