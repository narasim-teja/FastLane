export const siteConfig = {
  name: "FastLane",
  url: "https://fastlane.run",
  description: "Race the chain, own the road",
  email: "contact@fastlane.run",
  address: "",

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
    discord: "https://discord.gg/bsVZ3nup",
    x: "https://x.com/fastlane_run",
  },
} as const;

export type SiteConfig = typeof siteConfig;
