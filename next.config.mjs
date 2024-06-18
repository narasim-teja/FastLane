/* eslint-disable no-restricted-properties */
import withBundleAnalyzer from "@next/bundle-analyzer";
import createJiti from "jiti";

// This is validation for the environment variables early in the build process.
const jiti = createJiti(new URL(import.meta.url).pathname);
jiti("./lib/env");

const isDocker = process.env.IS_DOCKER === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    // unoptimized: true,
  },

  experimental: {
    // ...
  },
  output: isDocker ? "standalone" : undefined,
  // ...
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
