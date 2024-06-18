import React from "react";

import { useFBX } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import type { RapierRigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

export function GreenCandle({ position = [0, 0, 0] }) {
  const obstacleRef = React.useRef<RapierRigidBody>(null);

  const candle = useFBX("/green_candle.fbx");

  useFrame((state) => {
    if (obstacleRef.current) {
      const time = state.clock.getElapsedTime();

      // create a new THREE.Quaternion for rotation
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, time, 0));

      obstacleRef.current.setNextKinematicRotation(rotation);
    }
  });

  return (
    <group position={position as Position}>
      <RigidBody
        ref={obstacleRef}
        type="kinematicPosition"
        // restitution={0.2}
        restitution={0}
        friction={1}
      >
        <primitive
          object={candle}
          scale={0.005} // NOTE: scale down the model
          // position={[2.1, 0.2, 0]}
          position={[2, 0, 0]}
          rotation-z={Math.PI / 2}
        />
      </RigidBody>
    </group>
  );
}

useFBX.preload("/green_candle.fbx");
