"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";

import { login } from "~/lib/actions/auth";

export default function SignInPage() {
  const { user, authToken } = useDynamicContext();
  const router = useRouter();

  useEffect(() => {
    if (user && authToken) {
      login(authToken).then(() => {
        router.push("/play");
      });
    }
  }, [user, authToken, router]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-cal text-center text-2xl drop-shadow sm:text-3xl md:text-4xl">
        Sign In
      </h1>
      <p className="max-w-xs text-center text-xs text-muted-foreground md:text-sm">
        Connect your wallet to access your account and start playing.
      </p>
      <DynamicWidget />
    </div>
  );
}
