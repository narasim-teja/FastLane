import "./index.css";

import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";
import { TRPCReactProvider } from "./lib/trpc/provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TRPCReactProvider>
      <App />
    </TRPCReactProvider>
  </React.StrictMode>,
);
