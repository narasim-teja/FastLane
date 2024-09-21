import { useEffect, useRef } from "react";

import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import type { RapierRigidBody } from "@react-three/rapier";

import { useGame } from "~/hooks/use-game";

export function Multiplayer() {
  const { nodes, materials } = useGLTF("/marble.glb");

  const body = useRef<RapierRigidBody>(null);
  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 10, 10)).current;
  const smoothedCameraTarget = useRef(new THREE.Vector3()).current;

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { startGame, restartGame, isPaused } = useGame();

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      ({ phase }) => phase,
      (value) => {
        if (value === "ready" && body.current) {
          // TODO: check for the wakeUp parameter
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

    /* -----------------------------------------------------------------------------------------------
     * controls
     * -----------------------------------------------------------------------------------------------*/

    if (isPaused) {
      // optionally reset linear and angular velocity to 0 to stop all movement immediately
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }

    const { forward, backward, leftward, rightward } = getKeys();
    const bodyPosition = body.current.translation();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    // define base impulse and torque strengths
    const baseImpulseStrength = 0.5;
    const baseTorqueStrength = 0.5;

    // calculate impulse and torque strengths
    const impulseStrength = baseImpulseStrength * 0.5;
    const torqueStrength = baseTorqueStrength * 0.5;

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
    if (!(bodyPosition.y < -0.5) && !isPaused) {
      body.current.applyImpulse(impulse, true);
      body.current.applyTorqueImpulse(torque, true);
    }

    // restart the game if the player is below the base level
    if (bodyPosition.y < -2) {
      restartGame();
    }

    /* -----------------------------------------------------------------------------------------------
     * camera
     * -----------------------------------------------------------------------------------------------*/
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 10;
    cameraPosition.y += 3;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    if (leftward) {
      cameraPosition.x += 10;
      cameraPosition.z -= 10;
      cameraTarget.x -= 20;
    }

    if (rightward) {
      cameraPosition.x -= 10;
      cameraPosition.z -= 10;
      cameraTarget.x += 20;
    }

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
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
}
