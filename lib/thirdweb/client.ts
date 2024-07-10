import { createThirdwebClient } from "thirdweb";

import { env } from "../env";

const clientId = env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID; // this will be used on the client
// eslint-disable-next-line no-restricted-properties
const secretKey = process.env.THIRDWEB_SECRET_KEY; // this will be used on the server-side

export const thirdWebclient = createThirdwebClient(
  secretKey ? { secretKey } : { clientId }
);
