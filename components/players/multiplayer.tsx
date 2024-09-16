import { useEffect, useRef } from "react";

import { useKeyboardControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import type { RapierRigidBody } from "@react-three/rapier";

export function Multiplayer() {
  const body = useRef<RapierRigidBody>(null);
  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 10, 10)).current;
  const smoothedCameraTarget = useRef(new THREE.Vector3()).current;

  const texture = useTexture("/marbel-04.png");

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useEffect(() => {
    const unsubscribeKeys = subscribeKeys(() => {
      // ...
    });

    return () => {
      unsubscribeKeys();
    };
  }, [subscribeKeys]);

  useFrame((state, delta) => {
    if (!body.current) return;

    /* -----------------------------------------------------------------------------------------------
     * controls
     * -----------------------------------------------------------------------------------------------*/

    const { forward, backward, leftward, rightward } = getKeys();
    const bodyPosition = body.current.translation();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    // define base impulse and torque strengths
    const baseImpulseStrength = 0.3;
    const baseTorqueStrength = 0.2;

    // calculate impulse and torque strengths
    const impulseStrength = baseImpulseStrength * 0.3;
    const torqueStrength = baseTorqueStrength * 0.3;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    // only apply impulse and torque if the player is not below the base level
    if (!(bodyPosition.y < -0.5)) {
      body.current.applyImpulse(impulse, true);
      body.current.applyTorqueImpulse(torque, true);
    }

    /* -----------------------------------------------------------------------------------------------
     * camera
     * -----------------------------------------------------------------------------------------------*/
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 4.25;
    cameraPosition.y += 0.95;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });

  return (
    <>
      <RigidBody
        ref={body}
        canSleep={false}
        colliders="ball"
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
        position={[0, 0, 0]}
      >
        <mesh castShadow>
          <sphereGeometry args={[0.75, 25, 25]} />
          <meshStandardMaterial attach="material" map={texture} />
        </mesh>
      </RigidBody>
    </>
  );
}
