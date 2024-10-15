"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";

import { base64 } from "../utils";

export async function login(token: string) {
  cookies().set("jwt", token);
}

export async function isLoggedIn(address?: string) {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return false;
  }

  // You may need to implement JWT verification here
  // This depends on how Dynamic provides the JWT and how you want to verify it

  if (address) {
    cookies().set("address", base64.encode(address));
  }

  return true;
}

export async function logout() {
  cookies().delete("jwt");
  cookies().delete("address");
  redirect("/");
}
