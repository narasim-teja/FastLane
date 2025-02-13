import React, { useEffect, useRef } from "react";

import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import type { MeshProps } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";

import type { Position } from "~/types/misc";

import { useGame } from "~/hooks/use-game";
import { api } from "~/lib/trpc/react";

export const Multiplayer: React.FC<
  MeshProps & { address: string; position: Position }
> = ({ address, position, ...props }) => {
  const body = useRef<RapierRigidBody>(null);
  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 10, 10)).current;
  const smoothedCameraTarget = useRef(new THREE.Vector3()).current;
  const cameraAngle = useRef(0);
  const cameraHeight = useRef(3);
  const lastPlayerMovement = useRef(0);
  const lastBroadcastTime = useRef(0);
  const lastJumpedTime = useRef(0);
  const cameraMode = useRef<"normal" | "first-person" | "top">("normal");
  const lastCameraToggle = useRef(0);
  const verticalAngle = useRef(0);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { mutate: broadcastPosition } = api.ws.broadcastPosition.useMutation();

  const { startGame, restartGame, isPaused } = useGame();

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      ({ phase }) => phase,
      (value) => {
        if (value === "ready" && body.current) {
          cameraAngle.current = 0;
          body.current.setTranslation(
            { x: position[0], y: position[1], z: position[2] },
            true
          );
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
  }, [subscribeKeys, startGame]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((state, delta) => {
    if (!body.current) return;

    const { elapsedTime } = state.clock;

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
      camera,
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

    if (camera && elapsedTime - lastCameraToggle.current > 0.5) {
      if (cameraMode.current === "normal") {
        cameraMode.current = "first-person";
      } else if (cameraMode.current === "first-person") {
        cameraMode.current = "top";
      } else {
        cameraMode.current = "normal";
      }
      lastCameraToggle.current = elapsedTime;
    }

    const cameraPosition = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();

    switch (cameraMode.current) {
      case "first-person": {
        const verticalRad = THREE.MathUtils.degToRad(verticalAngle.current);
        const forwardOffset = 0.3; // small offset to keep camera in front of ball

        cameraPosition.copy(bodyPosition);
        cameraPosition.y += 0.5;
        // add small offset in movement direction to prevent camera going inside ball
        cameraPosition.x += Math.sin(cameraAngleRad) * forwardOffset;
        cameraPosition.z += Math.cos(cameraAngleRad) * forwardOffset;

        cameraTarget.copy(cameraPosition);
        // apply both horizontal and vertical rotation to look direction
        cameraTarget.x += Math.sin(cameraAngleRad) * Math.cos(verticalRad);
        cameraTarget.y += Math.sin(verticalRad);
        cameraTarget.z += Math.cos(cameraAngleRad) * Math.cos(verticalRad);
        break;
      }

      case "top": {
        const distance = 25; // fixed distance
        const angleInDegrees = 5 + cameraHeight.current * 0.777; // convert height control to angle (5-85 degrees)
        const angleInRadians = THREE.MathUtils.degToRad(angleInDegrees);

        cameraPosition.copy(bodyPosition);
        // position camera using spherical coordinates
        cameraPosition.x +=
          Math.sin(cameraAngleRad) * distance * Math.cos(angleInRadians);
        cameraPosition.y += distance * Math.sin(angleInRadians);
        cameraPosition.z +=
          Math.cos(cameraAngleRad) * distance * Math.cos(angleInRadians);

        // always look at the player
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 0.5;
        break;
      }

      default:
        cameraPosition.copy(bodyPosition).add(cameraOffset);
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 0.25;
        break;
    }

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
    const canJump = elapsedTime - lastJumpedTime.current > 1.75;

    if (forward && canJump) {
      impulse.addScaledVector(cameraForward, impulseStrength);
    }

    if (backward && canJump) {
      impulse.addScaledVector(cameraForward, -impulseStrength);
    }

    if (leftward && canJump) {
      impulse.addScaledVector(cameraRight, -impulseStrength);
    }

    if (rightward && canJump) {
      impulse.addScaledVector(cameraRight, impulseStrength);
    }

    if (jump && canJump) {
      impulse.y += 40;
      lastJumpedTime.current = elapsedTime;
    }

    if (panUp) {
      if (cameraMode.current === "first-person") {
        verticalAngle.current = Math.min(verticalAngle.current + 1, 89); // limit to 89 degrees up
      } else {
        cameraHeight.current = Math.min(cameraHeight.current + 1, 90);
      }
    }

    if (panDown) {
      if (cameraMode.current === "first-person") {
        verticalAngle.current = Math.max(verticalAngle.current - 1, -89); // limit to 89 degrees down
      } else {
        cameraHeight.current = Math.max(cameraHeight.current - 1, 0);
      }
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

    if (cameraMode.current === "first-person") {
      // in first-person, directly set camera position without smoothing
      state.camera.position.copy(cameraPosition);
      state.camera.lookAt(cameraTarget);
    } else {
      // for other modes, keep the smooth interpolation
      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);
    }

    /* -----------------------------------------------------------------------------------------------
     * broadcaster
     * -----------------------------------------------------------------------------------------------*/

    // broadcast position every 2 milliseconds, dont broadcast if the player has moved since last 10 seconds
    if (
      elapsedTime - lastBroadcastTime.current > 0.2 &&
      elapsedTime - lastPlayerMovement.current < 10
    ) {
      broadcastPosition({
        address,
        position: bodyPosition,
        rotation: bodyRotation,
      });
      lastBroadcastTime.current = elapsedTime;
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
      <mesh {...props} />
    </RigidBody>
  );
};
