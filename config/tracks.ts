export type Track = {
  title: string;
  description: string;
  className: string;
  image: string;
  color: [number, number, number];
};

export const tracks: Track[] = [
  {
    title: "Gold",
    description: "The classic experience",
    className: "p-5 pt-7",
    image: "/gold-coin.png",
    color: [131, 86, 45],
  },
  {
    title: "Eth",
    description: "The premium experience",
    className: "",
    image: "/eth-coin.png",
    color: [100, 100, 100],
  },
];

export const communityTracks: Track[] = [
  {
    title: "Base",
    description: "The Fastlane experience on base network",
    className: "",
    image: "/placeholder.svg",
    color: [100, 100, 100],
  },
];
