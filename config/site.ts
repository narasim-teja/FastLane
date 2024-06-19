export const siteConfig = {
  name: "FastLane",
  url: "https://www.fastlane.run",
  description: "Race the chain, own the road",

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
