"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ethers } from "ethers";
import { toast } from "sonner";

import type { Auth } from "~/types/auth";
import type { Track } from "~/types/misc";

import { Loader } from "~/components/loader";
import { useWeb3 } from "~/components/providers/web3-provider";
import { EthTrack } from "~/components/tracks/eth-track";
import { GoldTrack } from "~/components/tracks/gold-track";
import { CommunityTrack } from "~/components/tracks/oasis-community-track";
import { useGame } from "~/hooks/use-game";
import { useLocalStorage } from "~/hooks/use-local-storage";
import { env } from "~/lib/env";

import Common from "./_components/common";

const View = dynamic(() => import("~/components/canvas/view"), {
  ssr: false,
  loading: () => <Loader />,
});

type GamePageProps = {
  searchParams: {
    track: Track;
  };
};

export default function GamePage({ searchParams: { track } }: GamePageProps) {
  const router = useRouter();
  const { primaryWallet } = useDynamicContext();
  const { writeContract, readContract, signer } = useWeb3();
  const { startGame, setSpawnCheckpoint } = useGame();

  const [isGameActive, setIsGameActive] = React.useState(false);
  const hasAttemptedStart = React.useRef(false);
  const hasAttemptedSignIn = React.useRef(false);

  const [auth, setAuth] = useLocalStorage<Auth | null>("auth", null);

  const checkAuth = React.useCallback(async () => {
    if (hasAttemptedSignIn.current) return auth;

    if (auth && isAuthValid(auth)) {
      return auth;
    } else {
      console.log("Auth is invalid or expired. Performing sign-in");
      hasAttemptedSignIn.current = true;
      const newAuth = await signIn();
      hasAttemptedSignIn.current = false;
      return newAuth;
    }
  }, [signer, primaryWallet]); // eslint-disable-line react-hooks/exhaustive-deps

  const isAuthValid = (auth: Auth) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return auth && auth.time && currentTime - auth.time < 24 * 60 * 60; // Valid for 24 hours
  };

  const signIn = async () => {
    if (!primaryWallet || !signer) {
      console.error("Wallet or signer not available");
      return null;
    }

    try {
      const currentTime = Math.floor(Date.now() / 1000);
      const user = primaryWallet.address;
      console.log("Signing in for user:", user);

      const signature = await signer.signTypedData(
        {
          name: "SignInExample.SignIn",
          version: "1",
          chainId: 23295,
          verifyingContract: env.NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS,
        },
        {
          SignIn: [
            { name: "user", type: "address" },
            { name: "time", type: "uint32" },
          ],
        },
        {
          user,
          time: currentTime,
        }
      );
      const rsv = ethers.Signature.from(signature);
      const newAuth = { user, time: currentTime, rsv };

      setAuth(newAuth);

      console.log("Sign-in successful");
      return newAuth;
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Sign-in failed. Please try again.");
      return null;
    }
  };

  async function fetchGameState(auth: Auth) {
    if (!primaryWallet) {
      console.error("No primary wallet connected");
      throw new Error("No primary wallet connected");
    }

    if (!readContract) {
      console.error("Read contract is not initialized");
      throw new Error("Read contract is not initialized");
    }

    if (!auth) {
      console.error("Authentication data is missing");
      throw new Error("Authentication data is missing");
    }

    try {
      console.log("Fetching game state with auth:", auth);
      console.log("Primary wallet address:", primaryWallet.address);

      const gameState = await readContract.getGameState(
        {
          user: auth.user,
          time: auth.time,
          rsv: auth.rsv,
        },
        primaryWallet.address
      );

      const { isActive, timeRemaining, currentCheckpoint } = gameState;
      console.log("Game State:", {
        isActive,
        timeRemaining: timeRemaining.toString(),
        currentCheckpoint: currentCheckpoint.toString(),
      });
      setSpawnCheckpoint(Number(currentCheckpoint));

      return {
        isActive,
        timeRemaining: timeRemaining.toString(),
        currentCheckpoint: currentCheckpoint.toString(),
      };
    } catch (error) {
      console.error("Error fetching game state:", error);
      if (typeof error === "object" && error && "reason" in error) {
        console.error("Error reason:", error.reason);
      }
      throw error;
    }
  }

  async function startGameOnChain() {
    console.log("Attempting to start game...");
    const tx = await writeContract?.startGame({
      value: ethers.parseEther("0.1"),
    });
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Transaction confirmed");
  }

  React.useEffect(() => {
    const initializeGame = async () => {
      if (!primaryWallet || !signer || hasAttemptedStart.current) {
        return;
      }

      hasAttemptedStart.current = true;

      try {
        console.log("Initializing game...");
        const authResult = await checkAuth();
        if (authResult) {
          console.log("Auth successful, fetching game state...");
          const gameState = await fetchGameState(authResult);
          console.log("Fetched game state:", gameState);

          if (track === "eth") {
            if (!gameState.isActive || gameState.timeRemaining === "0") {
              await startGameOnChain();
              const updatedGameState = await fetchGameState(authResult);
              if (
                updatedGameState.isActive &&
                updatedGameState.timeRemaining !== "0"
              ) {
                setIsGameActive(true);
                startGame(); // Update the game state in the useGame hook
              } else {
                toast.error("Failed to start the game");
                router.push("/tracks");
              }
            } else {
              setIsGameActive(true);
              startGame(); // Update the game state in the useGame hook
            }
          } else {
            setIsGameActive(true);
          }
        } else {
          console.log("Auth failed or not available");
          toast.error("Authentication failed");
          router.push("/tracks");
        }
      } catch (error) {
        console.error("Error initializing game:", error);
        toast.error("Failed to initialize the game");
        router.push("/tracks");
      }
    };

    initializeGame();
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    primaryWallet,
    signer,
    writeContract,
    readContract,
    router,
    startGame,
    track,
    checkAuth,
  ]); // prettier-ignore

  if (!isGameActive) {
    return <Loader />;
  }

  return (
    <View className="h-dvh w-dvw overflow-hidden bg-background">
      <Common />

      {track === "gold" && <GoldTrack />}
      {track === "eth" && auth && <EthTrack auth={auth} />}
      {track === "oasis-track" && <CommunityTrack />}
    </View>
  );
}
