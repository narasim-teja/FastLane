import { cache } from "react";
import { headers } from "next/headers";

import { createCaller } from "~/server/router";
import { createContext } from "~/server/trpc";

/**
 * This wraps the `createContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createNextContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createContext({
    headers: heads,
  });
});

export const api = createCaller(createNextContext);
