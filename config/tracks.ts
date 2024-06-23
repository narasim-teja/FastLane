export type Track = {
  title: string;
  description: string;
  className: string;
  image: string;
  color: [number, number, number];
  entryFee: string;
};

export const tracks: Track[] = [
  {
    title: "Gold",
    description: "The classic experience",
    className: "p-5 pt-7",
    image: "/gold-coin.png",
    color: [131, 86, 45],
    entryFee: "N/A",
  },
  {
    title: "Eth",
    description: "The premium experience",
    className: "",
    image: "/eth-coin.png",
    color: [100, 100, 100],
    entryFee: "0.0001 ETH",
  },
];

export const communityTracks: Track[] = [
  {
    title: "Base",
    description: "The experience on base network",
    className: "p-4",
    image: "/base-coin.png",
    color: [99, 102, 241],
    entryFee: "N/A",
  },
];
