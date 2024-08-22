import type { ConnectButtonProps, ConnectEmbedProps } from "thirdweb/react";

import { generatePayload, isLoggedIn, login, logout } from "~/lib/actions/auth";

import { thirdWebclient } from "./client";

export const thirdwebProps: ConnectButtonProps | ConnectEmbedProps = {
  client: thirdWebclient,
  theme: "dark",
  auth: {
    isLoggedIn,
    doLogin: login,
    getLoginPayload: generatePayload,
    doLogout: logout,
  },
};
