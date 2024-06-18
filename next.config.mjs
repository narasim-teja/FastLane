/* eslint-disable no-restricted-properties */
import createJiti from "jiti";

// This is validation for the environment variables early in the build process.
const jiti = createJiti(new URL(import.meta.url).pathname);
jiti("./lib/env");

const isProd = process.env.NODE_ENV === "production";
const isDocker = process.env.IS_DOCKER === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    // unoptimized: true,
  },

  experimental: {
    ppr: true,
    reactCompiler: isProd,
    // ...
  },
  output: isDocker ? "standalone" : undefined,
  // ...
};

export default nextConfig;
