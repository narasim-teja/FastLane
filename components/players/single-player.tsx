"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Html,
  useGLTF,
  useKeyboardControls,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { toast } from "sonner";
import * as THREE from "three";

import type { RapierRigidBody } from "@react-three/rapier";

import type { Auth } from "~/types/auth";
import type { GamePlayAction } from "~/types/misc";

import { TIME_LIMIT } from "~/config/constants";
import { useGame } from "~/hooks/use-game";
import { getLogger } from "~/lib/logger";
import { api } from "~/lib/trpc/react";
import { cn } from "~/lib/utils";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "../icons";
import { Button } from "../ui/button";

export const SinglePlayer: React.FC<{
  from: "eth" | "gold";
  auth: Auth;
}> = ({ from, auth }) => {
  const logger = getLogger();

  const { gl } = useThree();

  const { nodes, materials } = useGLTF("/models/gold-track/marble.glb");

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { mutate: revealRow } = api.ws.revealRow.useMutation();
  const { mutateAsync: updateCheckpoint } =
    api.ws.updateCheckpoint.useMutation();

  const smoothedCameraPosition = useRef(new THREE.Vector3(10, 10, 10)).current;
  const smoothedCameraTarget = useRef(new THREE.Vector3()).current;
  const body = useRef<RapierRigidBody>(null);
  const keysRef = useRef({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
  }).current;
  const lastRow = useRef(0);
  const timerRef = useRef<HTMLParagraphElement>(null);

  const [_recordedActions, setRecordedActions] = useState<GamePlayAction[]>([]);
  const [switchControls, setSwitchControls] = useState(false);
  // const [_, setSimulationData] = useState<GamePlayAction[]>([]);
  // const [simulationIndex, setSimulationIndex] = useState(0);

  const {
    phase,
    startTime,
    startGame,
    restartGame,
    isSpeedBoostActive,
    isSpeedReduced,
    isPaused,
    isEditorOpen,
    spawnCheckpoint,
  } = useGame();

  const playerPosition = -(spawnCheckpoint * 50) + (from === "gold" ? 2 : 0.75);

  // useEffect(() => {

  //   void (async () => {
  //     try {
  //       const response = await fetch("/player-actions.json");
  //       const data = await response.json();
  //       setSimulationData(data as GamePlayAction[]);
  //     } catch (error) {
  //       console.error("Error loading the JSON data: ", error);
  //     }
  //   })();
  // }, []);

  // useEventListener("keydown", (event) => {
  //   if (event.code === "Space") {
  //     downloadRecordedActions(recordedActions);
  //   }
  // });

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      ({ phase }) => phase,
      (value) => {
        if (value === "ready" && body.current) {
          // TODO: check for the wakeUp parameter
          body.current.setTranslation({ x: 0, y: 1, z: playerPosition }, true);
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
  }, [startGame, subscribeKeys, playerPosition, from]);

  console.log({ lastRow: lastRow.current });

  useFrame((state, delta) => {
    if (!body.current) return;

    if (phase === "playing" && !isEditorOpen) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const remainingTime = Math.max(
        TIME_LIMIT - Math.floor(elapsedTime / 1000),
        0
      );

      if (timerRef.current) {
        timerRef.current.textContent = remainingTime.toString();

        if (remainingTime <= 3) {
          timerRef.current.classList.add("text-red-500");
        } else {
          timerRef.current.classList.remove("text-red-500");
        }

        if (remainingTime <= 0) {
          revealRow({
            track: from,
            rowIdx: spawnCheckpoint * 10,
            auth: {
              user: auth.user,
              time: auth.time,
              rsv: auth.rsv,
            },
          });

          lastRow.current = 0;

          restartGame();

          timerRef.current.textContent = TIME_LIMIT.toString();
        }
      }
    }

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
    const baseImpulseStrength = 0.3;
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

    if (forward || keysRef.forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;

      setRecordedActions((prev) => [
        ...prev,
        { frameNumber, action: "forward" },
      ]);
    }

    if (rightward || keysRef.rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
      setRecordedActions((prev) => [...prev, { frameNumber, action: "right" }]);
    }

    if (backward || keysRef.backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;

      setRecordedActions((prev) => [
        ...prev,
        { frameNumber, action: "backward" },
      ]);
    }

    if (leftward || keysRef.leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
      setRecordedActions((prev) => [...prev, { frameNumber, action: "left" }]);
    }

    // only apply impulse and torque if the player is not below the base level
    if (!(bodyPosition.y < -0.5) && !isPaused && !isEditorOpen) {
      body.current.applyImpulse(impulse, true);
      body.current.applyTorqueImpulse(torque, true);

      //   broadcastPosition({
      //     address: account.address,
      //     impulse,
      //     torque,
      //   });
      // }
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
    //       logger.info(`Unknown action: ${action}`);
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
    // logger.info(zPosition)

    const currentRow = Math.floor((-zPosition - 2) / 5);
    // console.log("currentRow", currentRow); // when to reveal the obstacle
    // logger.info(currentRow)
    // Assuming each unit in Z represents a row

    // check if the player has moved to a new row
    if (currentRow > lastRow.current && bodyPosition.y > 0) {
      logger.info(lastRow.current);
      lastRow.current = currentRow; // update the last row

      if (currentRow % 10 === 9) {
        const checkpointNumber = Math.floor((currentRow + 1) / 10);

        toast.promise(
          updateCheckpoint({
            address: auth.user,
            checkpointNumber,
          }),
          {
            loading: "Updating checkpoint...",
            success: "Checkpoint updated",
            error: "Failed to update checkpoint",
          }
        );
      }

      // emit event to server to reveal the next row of obstacles
      revealRow({
        track: from,
        rowIdx: currentRow,
        auth: {
          user: auth.user,
          time: auth.time,
          rsv: auth.rsv,
        },
      });
    }

    if (bodyPosition.y < -2) {
      revealRow({
        track: from,
        rowIdx: spawnCheckpoint * 8,
        auth: {
          user: auth.user,
          time: auth.time,
          rsv: auth.rsv,
        },
      });

      // lastRow.current = spawnCheckpoint * 10;
      lastRow.current = 0;

      restartGame();

      if (timerRef.current) {
        timerRef.current.textContent = TIME_LIMIT.toString();
        timerRef.current.classList.remove("text-red-500");
      }
    }
  });

  function updateKeys(key: keyof typeof keysRef, value: boolean) {
    keysRef[key] = value;

    if (phase === "ready") {
      startGame();
    }
  }

  // const ball = useFBX("/marble-high-poly.fbx");
  const texture = useTexture("/marbel-04.png");

  return (
    <>
      <Html fullscreen className="pointer-events-none">
        <div className="pointer-events-none absolute inset-x-0 top-28 z-10 grid w-full place-items-center">
          <p
            ref={timerRef}
            className={cn(
              "font-matter grid size-20 min-w-fit place-items-center rounded-full border border-white/20 bg-white/20 p-4 text-5xl font-semibold shadow backdrop-blur",
              isEditorOpen && "hidden"
            )}
          >
            <span className="mx-2">START</span>
          </p>
        </div>

        <div className="pointer-events-auto absolute bottom-0 h-[33.33dvh] w-full bg-[#363636] lg:hidden">
          {switchControls && (
            <div className="relative size-full">
              <div className="absolute right-4 top-4 space-y-1">
                <button
                  onClick={() => setSwitchControls(false)}
                  className="flex h-10 w-14 items-center justify-center gap-2 rounded-md bg-zinc-900 p-2 shadow-md"
                >
                  <div className="flex w-1/3 flex-col justify-evenly gap-0.5 *:size-2 *:rounded-full *:bg-zinc-500">
                    <div />
                    <div />
                  </div>

                  <div className="flex w-2/3 justify-evenly gap-0.5 *:size-2 *:rounded-full *:bg-zinc-500">
                    <div />
                    <div />
                  </div>
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  Controls
                </p>
              </div>

              <div className="grid size-full grid-cols-3 place-items-center">
                <Button
                  size="custom"
                  variant="custom"
                  onTouchStart={() => updateKeys("forward", true)}
                  onTouchEnd={() => updateKeys("forward", false)}
                  className="col-start-2 row-start-1"
                >
                  <ArrowUp className="size-20" />
                </Button>
                <Button
                  size="custom"
                  variant="custom"
                  onTouchStart={() => updateKeys("leftward", true)}
                  onTouchEnd={() => updateKeys("leftward", false)}
                  className="col-start-1 row-start-2"
                >
                  <ArrowLeft className="size-20" />
                </Button>
                <Button
                  size="custom"
                  variant="custom"
                  onTouchStart={() => updateKeys("backward", true)}
                  onTouchEnd={() => updateKeys("backward", false)}
                  className="col-start-2 row-start-2"
                >
                  <ArrowDown className="size-20" />
                </Button>
                <Button
                  size="custom"
                  variant="custom"
                  onTouchStart={() => updateKeys("rightward", true)}
                  onTouchEnd={() => updateKeys("rightward", false)}
                  className="col-start-3 row-start-2"
                >
                  <ArrowRight className="size-20" />
                </Button>
              </div>
            </div>
          )}

          {!switchControls && (
            <div className="relative size-full">
              <div className="absolute right-4 top-4 space-y-1">
                <button
                  onClick={() => setSwitchControls(true)}
                  className="grid h-10 w-14 grid-cols-3 gap-1 rounded-md bg-zinc-900 p-2 shadow-md *:size-2 *:rounded-full *:bg-zinc-500"
                >
                  <div className="col-start-2 row-start-1" />
                  <div className="col-start-1 row-start-2" />
                  <div className="col-start-2 row-start-2" />
                  <div className="col-start-3 row-start-2" />
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Controls
                </p>
              </div>

              <div className="flex size-full">
                <div className="flex h-full w-1/3 flex-col items-center justify-evenly">
                  <Button
                    size="custom"
                    variant="custom"
                    onTouchStart={() => updateKeys("forward", true)}
                    onTouchEnd={() => updateKeys("forward", false)}
                    className="col-start-2 row-start-1"
                  >
                    <ArrowUp className="size-20" />
                  </Button>
                  <Button
                    size="custom"
                    variant="custom"
                    onTouchStart={() => updateKeys("backward", true)}
                    onTouchEnd={() => updateKeys("backward", false)}
                    className="col-start-2 row-start-3"
                  >
                    <ArrowDown className="size-20" />
                  </Button>
                </div>

                <div className="flex w-2/3 justify-evenly">
                  <Button
                    size="custom"
                    variant="custom"
                    onTouchStart={() => updateKeys("leftward", true)}
                    onTouchEnd={() => updateKeys("leftward", false)}
                    className="col-start-1 row-start-2"
                  >
                    <ArrowLeft className="size-20" />
                  </Button>
                  <Button
                    size="custom"
                    variant="custom"
                    onTouchStart={() => updateKeys("rightward", true)}
                    onTouchEnd={() => updateKeys("rightward", false)}
                    className="col-start-3 row-start-2"
                  >
                    <ArrowRight className="size-20" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pointer-events-auto absolute inset-x-1/2 bottom-8 z-10 hidden w-full -translate-x-1/2 grid-flow-col grid-rows-2 items-center justify-center gap-2 *:size-16 *:cursor-pointer *:rounded-md *:border *:border-white/20 *:backdrop-blur md:bottom-4 *:md:size-12 lg:grid">
          <div
            onTouchStart={() => updateKeys("forward", true)}
            onTouchEnd={() => updateKeys("forward", false)}
            className={cn(
              "col-start-2 row-start-1 bg-white/20",
              (getKeys().forward || keysRef.forward) && "bg-white/40 shadow-md"
            )}
          />

          <div
            onTouchStart={() => updateKeys("leftward", true)}
            onTouchEnd={() => updateKeys("leftward", false)}
            className={cn(
              "col-start-1 row-start-2 bg-white/20",
              (getKeys().leftward || keysRef.leftward) &&
                "bg-white/40 shadow-md"
            )}
          />
          <div
            onTouchStart={() => updateKeys("backward", true)}
            onTouchEnd={() => updateKeys("backward", false)}
            className={cn(
              "col-start-2 row-start-2 bg-white/20",
              (getKeys().backward || keysRef.backward) &&
                "bg-white/40 shadow-md"
            )}
          />
          <div
            onTouchStart={() => updateKeys("rightward", true)}
            onTouchEnd={() => updateKeys("rightward", false)}
            className={cn(
              "col-start-3 row-start-2 bg-white/20",
              (getKeys().rightward || keysRef.rightward) &&
                "bg-white/40 shadow-md"
            )}
          />
        </div>
      </Html>

      <RigidBody
        ref={body}
        canSleep={false}
        colliders="ball"
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
        position={[0, 1, playerPosition]}
      >
        {/* <primitive object={ball} scale={0.005} /> */}

        {from === "gold" ?
          // @ts-expect-error Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'.
          <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
        : <mesh castShadow>
            <sphereGeometry args={[0.25, 18, 18]} />
            <meshStandardMaterial attach="material" map={texture} />
          </mesh>
        }
      </RigidBody>
    </>
  );
};
