export const siteConfig = {
  name: "FastLane",
  url: "https://www.fastlane.run",
  description: "",

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
