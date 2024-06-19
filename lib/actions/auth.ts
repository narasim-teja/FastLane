"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";

import type {
  GenerateLoginPayloadParams,
  VerifyLoginPayloadParams,
} from "thirdweb/auth";

import { env } from "../env";
import { client } from "../thirdweb/client";

const thirdwebAuth = createAuth({
  domain: env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN,
  adminAccount: privateKeyToAccount({
    client,
    privateKey: env.THIRDWEB_ADMIN_PRIVATE_KEY,
  }),
});

export const generatePayload = (params: GenerateLoginPayloadParams) =>
  thirdwebAuth.generatePayload(params);

export async function login(payload: VerifyLoginPayloadParams) {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);

  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });

    cookies().set("jwt", jwt);
  }
}

export async function isLoggedIn() {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return false;
  }
  return true;
}

export async function logout() {
  cookies().delete("jwt");
  redirect("/");
}
