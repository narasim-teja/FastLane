"use client";

import React from "react";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Loader2 } from "lucide-react";

import { Button } from "./ui/button";

export function ConnectWallet() {
  const { sdkHasLoaded } = useDynamicContext();

  if (!sdkHasLoaded) {
    return (
      <Button disabled className="h-12 w-[9.5rem] rounded-[0.625rem]">
        <Loader2 className="size-5 animate-spin" />
      </Button>
    );
  }

  return <DynamicWidget />;
}
