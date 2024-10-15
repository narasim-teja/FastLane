"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

import type { JwtPayload } from "jsonwebtoken";

import { env } from "../env";
import { getLogger } from "../logger";

const logger = getLogger();

export async function isLoggedIn() {
  const encodedJwt = cookies().get("DYNAMIC_JWT_TOKEN")?.value;

  if (!encodedJwt) {
    return false;
  }

  const jwksUrl = `https://app.dynamic.xyz/api/v0/sdk/${env.DYNAMIC_ENVIRONMENT_ID}/.well-known/jwks`;

  const client = new JwksClient({
    jwksUri: jwksUrl,
    rateLimit: true,
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 600000,
  });

  const signingKey = await client.getSigningKey();
  const publicKey = signingKey.getPublicKey();

  try {
    const decodedToken: JwtPayload = jwt.verify(encodedJwt, publicKey, {
      ignoreExpiration: false,
    }) as JwtPayload;

    // if (decodedToken.scopes.includes("requiresAdditionalAuth")) {
    //   throw new Error("Additional verification required");
    // }

    logger.info({ decodedToken }, "User is logged in");

    return true;
  } catch (error) {
    logger.error({ error }, "User verification failed");

    return false;
  }
}
