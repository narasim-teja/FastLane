import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import {
  createWSClient,
  loggerLink,
  splitLink,
  unstable_httpBatchStreamLink,
  wsLink,
} from "@trpc/client";
import SuperJSON from "superjson";

import { api, getQueryClient } from ".";
import { env } from "../env";

const wsClient = createWSClient({
  url: env.VITE_BACKEND_URL.replace(/https?/, "ws"),
});

export function TRPCReactProvider(props: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  const [trpcClient] = React.useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            import.meta.env.DEV ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        splitLink({
          condition: (op) => op.type === "subscription",
          true: wsLink({ client: wsClient, transformer: SuperJSON }),
          false: unstable_httpBatchStreamLink({
            transformer: SuperJSON,
            url: env.VITE_BACKEND_URL,
            headers() {
              const headers = new Headers();
              headers.set("x-trpc-source", "fastlane-react");
              return headers;
            },
          }),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
