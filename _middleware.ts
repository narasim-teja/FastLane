import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { isLoggedIn as isUserLoggedIn } from "~/lib/actions/auth";

import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./config/auth-routes";

export async function middleware(req: NextRequest) {
  /* -----------------------------------------------------------------------------------------------
   * Authentication middleware
   * -----------------------------------------------------------------------------------------------*/

  const { nextUrl } = req;

  const isLoggedIn = await isUserLoggedIn();
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let from = nextUrl.pathname;
    if (nextUrl.search) {
      from += nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/connect-wallet?from=${encodeURIComponent(from)}`, nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  // match all routes except static files
  matcher: ["/((?!.+\\.[\\w]+$).*)"],
};
