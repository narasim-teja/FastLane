import React, { useEffect, useRef } from "react";

import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import type { RapierRigidBody } from "@react-three/rapier";

import { useGame } from "~/hooks/use-game";
import { api } from "~/lib/trpc/react";

export const Multiplayer: React.FC<{ address: string }> = ({ address }) => {
  const { nodes, materials } = useGLTF("/marble.glb");

  const body = useRef<RapierRigidBody>(null);
  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 10, 10)).current;
  const smoothedCameraTarget = useRef(new THREE.Vector3()).current;
  const lastBroadcast = useRef(0);
  const cameraAngleRef = useRef(0); // Angle in degrees
  const prevKeyState = useRef({
    leftward: false,
    rightward: false,
  }).current;

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { mutate: broadcastPosition } = api.ws.broadcastPosition.useMutation();

  const { startGame, restartGame, isPaused } = useGame();

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      ({ phase }) => phase,
      (value) => {
        if (value === "ready" && body.current) {
          cameraAngleRef.current = 0; // Reset camera angle
          body.current.setTranslation({ x: 2, y: 1, z: 0 }, true);
          body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
          body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
      }
    );

    const unsubscribeKeys = subscribeKeys(() => {
      startGame();
    });

    return () => {
      unsubscribeReset();
      unsubscribeKeys();
    };
  }, [subscribeKeys, startGame]);

  useFrame((state, delta) => {
    if (!body.current) return;

    if (isPaused) {
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }

    const { forward, backward, leftward, rightward } = getKeys();
    const bodyPosition = body.current.translation();
    const bodyRotation = body.current.rotation();

    const impulseStrength = 0.5; // Adjust as needed

    // Handle camera rotation when leftward or rightward is first pressed and no movement keys are pressed
    if (leftward && !prevKeyState.leftward && !forward && !backward) {
      cameraAngleRef.current += 90; // Rotate camera 90 degrees to the left
      if (cameraAngleRef.current >= 360) cameraAngleRef.current -= 360;
    }

    if (rightward && !prevKeyState.rightward && !forward && !backward) {
      cameraAngleRef.current -= 90; // Rotate camera 90 degrees to the right
      if (cameraAngleRef.current < 0) cameraAngleRef.current += 360;
    }

    // Update the previous key states
    prevKeyState.leftward = leftward;
    prevKeyState.rightward = rightward;

    // Compute camera position and target
    const cameraDistance = 10; // Adjust as needed
    const cameraHeight = 3; // Adjust as needed
    const cameraAngleRad = THREE.MathUtils.degToRad(cameraAngleRef.current);

    const cameraOffset = new THREE.Vector3(
      cameraDistance * Math.sin(cameraAngleRad),
      cameraHeight,
      cameraDistance * Math.cos(cameraAngleRad)
    );

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition).add(cameraOffset);

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    // Compute camera's forward and right vectors
    const cameraForward = new THREE.Vector3();
    cameraForward.subVectors(cameraTarget, cameraPosition).normalize();

    const cameraRight = new THREE.Vector3();
    cameraRight
      .crossVectors(cameraForward, new THREE.Vector3(0, 1, 0))
      .normalize();

    // Adjust movement controls to be relative to the camera
    const impulse = new THREE.Vector3();

    if (forward) {
      impulse.add(cameraForward.clone().multiplyScalar(impulseStrength));
    }

    if (backward) {
      impulse.add(cameraForward.clone().multiplyScalar(-impulseStrength));
    }

    if (leftward && (forward || backward)) {
      impulse.add(cameraRight.clone().multiplyScalar(-impulseStrength));
    }

    if (rightward && (forward || backward)) {
      impulse.add(cameraRight.clone().multiplyScalar(impulseStrength));
    }

    // Apply impulses
    if (!(bodyPosition.y < -0.5) && !isPaused) {
      body.current.applyImpulse(impulse, true);
      // Apply torque if needed
    }

    // Restart the game if the player is below the base level
    if (bodyPosition.y < -2) {
      restartGame();
    }

    // Smoothly interpolate the camera position and target
    smoothedCameraPosition.lerp(cameraPosition, 2 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 2 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    /* -----------------------------------------------------------------------------------------------
     * broadcaster
     * -----------------------------------------------------------------------------------------------*/

    const currentTime = state.clock.elapsedTime;

    // broadcast position every 0.5 seconds
    if (currentTime - lastBroadcast.current > 0.5) {
      broadcastPosition({
        address,
        position: bodyPosition,
        rotation: bodyRotation,
      });
      lastBroadcast.current = currentTime;
    }
  });

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[19.487, 0.377, 6.678]}
    >
      <mesh
        // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
        geometry={nodes.Icosphere.geometry}
        material={materials["Material.026"]}
      />
    </RigidBody>
  );
};
