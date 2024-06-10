import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@fastlane/api";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined = undefined;

export function getQueryClient() {
  return (clientQueryClientSingleton ??= createQueryClient());
}

export const api = createTRPCReact<AppRouter>();
