"use client";

import { useEffect, useRef, useState } from "react";

import { useKeyboardControls, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import type { RapierRigidBody } from "@react-three/rapier";

import type { GamePlayAction } from "~/types/misc";

import { CHAIN_ID, SESSION_ID } from "~/config/constants";
import { useEventListener } from "~/hooks/use-event-listner";
import { useGame } from "~/hooks/use-game";
import { api } from "~/lib/trpc/react";
import { downloadRecordedActions } from "~/lib/utils";

export function Player() {
  const { gl } = useThree();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { mutate: revealRow } = api.ws.revealRow.useMutation({});

  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 10, 10)).current;
  const smoothedCameraTarget = useRef(new THREE.Vector3()).current;
  const body = useRef<RapierRigidBody>(null);
  const lastRow = useRef(0);

  const [recordedActions, setRecordedActions] = useState<GamePlayAction[]>([]);
  const [_, setSimulationData] = useState<GamePlayAction[]>([]);
  // const [simulationIndex, setSimulationIndex] = useState(0);

  const {
    startGame,
    restartGame,
    isSpeedBoostActive,
    isSpeedReduced,
    isPaused,
  } = useGame();

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/player-actions.json");
        const data = await response.json();
        setSimulationData(data as GamePlayAction[]);
      } catch (error) {
        console.error("Error loading the JSON data: ", error);
      }
    })();
  }, []);

  useEventListener("keydown", (event) => {
    if (event.code === "Space") {
      downloadRecordedActions(recordedActions);
    }
  });

  function reset() {
    if (body.current) {
      // TODO: check for the wakeUp parameter
      body.current.setTranslation({ x: 2, y: 1, z: 7 }, true);
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  }

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      ({ phase }) => phase,
      (value) => {
        if (value === "ready") reset();
      }
    );

    const unsubscribeKeys = subscribeKeys(() => {
      startGame();
    });

    return () => {
      unsubscribeReset();
      unsubscribeKeys();
    };
  }, [startGame, subscribeKeys]);

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

    // frame number approximation
    const frameNumber =
      state.clock.getElapsedTime() * gl.capabilities.getMaxAnisotropy();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    // define base impulse and torque strengths
    const baseImpulseStrength = 0.6;
    const baseTorqueStrength = 0.2;

    // define multipliers for boost and reduction
    const boostMultiplier = 3;
    const reductionMultiplier = 0.1;

    // calculate impulse and torque strengths
    let impulseStrength = baseImpulseStrength * 0.007;
    let torqueStrength = baseTorqueStrength * 0.007;

    if (isSpeedBoostActive && !isSpeedReduced) {
      impulseStrength *= boostMultiplier;
      torqueStrength *= boostMultiplier;
    } else if (isSpeedReduced && !isSpeedBoostActive) {
      impulseStrength *= reductionMultiplier;
      torqueStrength *= reductionMultiplier;
    }

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;

      setRecordedActions((prev) => [
        ...prev,
        { frameNumber, action: "forward" },
      ]);
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
      setRecordedActions((prev) => [...prev, { frameNumber, action: "right" }]);
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;

      setRecordedActions((prev) => [
        ...prev,
        { frameNumber, action: "backward" },
      ]);
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
      setRecordedActions((prev) => [...prev, { frameNumber, action: "left" }]);
    }

    // only apply impulse and torque if the player is not below the base level
    if (!(bodyPosition.y < -0.5) && !isPaused) {
      body.current.applyImpulse(impulse, true);
      body.current.applyTorqueImpulse(torque, true);
    }

    // // make sure there is an action to simulate and we're within the bounds of the simulationData array.
    // if (simulationIndex < simulationData.length) {
    //   // access the next action using simulationIndex.
    //   const nextAction = simulationData[simulationIndex];

    //   // check if it's time to simulate the next action based on the frame number.
    //   if (frameNumber >= nextAction.frameNumber) {
    //     // you'll need to adjust the simulateAction function to include impulseStrength and torqueStrength calculation or handling.
    //     simulateAction(nextAction.action);

    //     // move to the next action in the simulationData.
    //     setSimulationIndex(simulationIndex + 1);
    //   }
    // }

    // function simulateAction(action: string) {
    //   const impulse = { x: 0, y: 0, z: 0 };
    //   const torque = { x: 0, y: 0, z: 0 };
    //   const impulseStrength = 0.6 * 0.007;
    //   const torqueStrength = 0.2 * 0.007;

    //   switch (action) {
    //     case "forward":
    //       impulse.z -= impulseStrength;
    //       torque.x -= torqueStrength;
    //       break;
    //     case "right":
    //       impulse.x += impulseStrength;
    //       torque.z -= torqueStrength;
    //       break;
    //     case "backward":
    //       impulse.z += impulseStrength;
    //       torque.x += torqueStrength;
    //       break;
    //     case "left":
    //       impulse.x -= impulseStrength;
    //       torque.z += torqueStrength;
    //       break;
    //     default:
    //       console.log(`Unknown action: ${action}`);
    //   }

    //   if (body.current) {
    //     body.current.applyImpulse(impulse, false);
    //     body.current.applyTorqueImpulse(torque, false);
    //   }
    // }

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

    /* -----------------------------------------------------------------------------------------------
     * phases
     * -----------------------------------------------------------------------------------------------*/
    const zPosition = body.current.translation().z;

    const currentRow = Math.floor(-zPosition / 4.75); // when to reveal the obstacle
    // console.log(currentRow)
    // Assuming each unit in Z represents a row

    // check if the player has moved to a new row
    if (currentRow > lastRow.current && bodyPosition.y > 0) {
      lastRow.current = currentRow; // update the last row
      // emit event to server to reveal the next row of obstacles
      revealRow({
        chainId: CHAIN_ID,
        sessionId: SESSION_ID,
        rowIdx: currentRow,
      });
    }

    if (bodyPosition.y < -2) {
      revealRow({
        chainId: CHAIN_ID,
        sessionId: SESSION_ID,
        rowIdx: 0,
      });

      lastRow.current = 0;
      restartGame();
    }
  });

  // const ball = useFBX("/marble-high-poly.fbx");
  const texture = useTexture("/marbel-04.png");

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[2, 1, 7]}
    >
      {/* <primitive object={ball} scale={0.005} /> */}

      <mesh castShadow>
        <sphereGeometry args={[0.25, 18, 18]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
    </RigidBody>
  );
}
