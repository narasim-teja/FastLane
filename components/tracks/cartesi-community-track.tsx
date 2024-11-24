"use client";

import * as React from "react";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Physics, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";

import type { Clients, Position } from "~/types/misc";

import { api } from "~/lib/trpc/react";

import { Multiplayer } from "../players/multiplayer";
import { CartesiModel } from "./cartesi-model";

export const CartesiCommunityTrack: React.FC = () => {
  const { primaryWallet } = useDynamicContext();
  const address = primaryWallet?.address ?? "";

  const { debugPhysics } = useControls("Debug Tools", {
    debugPhysics: false,
  });

  const [clients, setClients] = React.useState<Clients>({});

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

  const x = React.useMemo(
    () => Math.floor(Math.random() * (80 - 40 + 1) + 40),
    []
  );

  return (
    <Physics debug={debugPhysics} colliders="trimesh">
      <CartesiModel position={[0, 20, 0]} />

      {Object.keys(clients).map((clientAddress) => {
        if (clientAddress === address) {
          // ~ 40 - 80

          const position: Position = [x, 55, 140];

          return (
            <Multiplayer
              key={clientAddress}
              address={address}
              position={position}
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
          >
            <mesh>
              <circleGeometry args={[0.2, 32]} />
              <meshStandardMaterial />
            </mesh>
          </RigidBody>
        );
      })}
    </Physics>
  );
};
