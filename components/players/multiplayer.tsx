import React, { useEffect, useRef } from "react";

import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import type { RapierRigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

import { useGame } from "~/hooks/use-game";
import { api } from "~/lib/trpc/react";

export const Multiplayer: React.FC<{ address: string; position: Position }> = ({
  address,
  position,
}) => {
  const { nodes, materials } = useGLTF("/models/marble.glb");

  const body = useRef<RapierRigidBody>(null);
  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 10, 10)).current;
  const smoothedCameraTarget = useRef(new THREE.Vector3()).current;
  const cameraAngle = useRef(0);
  const cameraHeight = useRef(3);
  const lastBroadcast = useRef(0);
  const lastPlayerMovement = useRef(0);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { mutate: broadcastPosition } = api.ws.broadcastPosition.useMutation();

  const { startGame, restartGame, isPaused } = useGame();

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      ({ phase }) => phase,
      (value) => {
        if (value === "ready" && body.current) {
          cameraAngle.current = 0;
          body.current.setTranslation({ x: 2, y: 1, z: 0 }, true);
          body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
          body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
      }
    );

    const unsubscribeKeys = subscribeKeys(() => {
      startGame();
      lastPlayerMovement.current = Date.now();
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
      return;
    }

    const {
      forward,
      backward,
      leftward,
      rightward,
      jump,
      panLeft,
      panRight,
      panUp,
      panDown,
    } = getKeys();
    const bodyPosition = body.current.translation();
    const bodyRotation = body.current.rotation();

    const impulseStrength = 0.5;

    // compute camera position and target
    const cameraDistance = 10;
    const cameraAngleRad = THREE.MathUtils.degToRad(cameraAngle.current);

    const horizontalDistance =
      cameraDistance * Math.cos(THREE.MathUtils.degToRad(cameraHeight.current));
    const verticalDistance =
      cameraDistance * Math.sin(THREE.MathUtils.degToRad(cameraHeight.current));

    const cameraOffset = new THREE.Vector3(
      horizontalDistance * Math.sin(cameraAngleRad),
      verticalDistance,
      horizontalDistance * Math.cos(cameraAngleRad)
    );

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition).add(cameraOffset);

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    // compute camera's forward and right vectors
    const cameraForward = new THREE.Vector3();
    cameraForward.subVectors(cameraTarget, cameraPosition).normalize();
    cameraForward.y = 0;

    const cameraRight = new THREE.Vector3();
    cameraRight
      .crossVectors(cameraForward, new THREE.Vector3(0, 1, 0))
      .normalize();

    // adjust movement controls to be relative to the camera
    const impulse = new THREE.Vector3();

    if (forward) {
      impulse.addScaledVector(cameraForward, impulseStrength);
    }

    if (backward) {
      impulse.addScaledVector(cameraForward, -impulseStrength);
    }

    if (leftward) {
      impulse.addScaledVector(cameraRight, -impulseStrength);
    }

    if (rightward) {
      impulse.addScaledVector(cameraRight, impulseStrength);
    }

    if (jump && bodyPosition.y <= 2.25) {
      impulse.y += 2;
    }

    if (panUp) {
      cameraHeight.current = Math.min(cameraHeight.current + 1, 90);
    }

    if (panDown) {
      cameraHeight.current = Math.max(cameraHeight.current - 1, 0);
    }

    if (panLeft) {
      cameraAngle.current += 1;
      if (cameraAngle.current >= 360) cameraAngle.current -= 360;
    }

    if (panRight) {
      cameraAngle.current -= 1;
      if (cameraAngle.current < 0) cameraAngle.current += 360;
    }

    // only apply impulse and torque if the player is not below the base level
    if (!(bodyPosition.y < -0.5)) {
      body.current.applyImpulse(impulse, true);
    }

    // restart the game if the player is below the base level
    if (bodyPosition.y < -2) {
      restartGame();
    }

    // Smoothly interpolate the camera position and target
    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    /* -----------------------------------------------------------------------------------------------
     * broadcaster
     * -----------------------------------------------------------------------------------------------*/

    const currentTime = Date.now();

    // broadcast position every 2, dont broadcast if the player has moved since last 10 seconds
    if (
      currentTime - lastBroadcast.current > 20 &&
      currentTime - lastPlayerMovement.current < 10 * 1000
    ) {
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
      position={position}
    >
      <mesh
        geometry={nodes.Icosphere.geometry}
        material={materials["Material.026"]}
      />
    </RigidBody>
  );
};
