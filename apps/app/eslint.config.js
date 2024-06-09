import baseConfig from "@fastlane/eslint-config/base";
import reactConfig from "@fastlane/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
