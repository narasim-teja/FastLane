export const siteConfig = {
  name: "FastLane",
  url: "https://www.fastlane.run",
  description: "Race the chain, own the road",
  email: "contact@fastlane.run",
  address: "470 Noor Ave STE B #1148, South San Francisco, CA 94080",

  authors: [
    {
      name: "",
      url: "",
      email: "",
      x: "",
    },
  ],

  keywords: [],

  links: {
    discord: "",
    x: "https://x.com/fastlane_run",
  },
} as const;

export type SiteConfig = typeof siteConfig;
