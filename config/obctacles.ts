export type Obstacle = {
  label: string;
  value: string;
  image: string;
  description: string;
};

export const OBSTACLES: Obstacle[] = [
  {
    label: "None",
    value: "null",
    image: "/placeholder.svg",
    description: "No obstacle",
  },
  {
    label: "Whale Obstacle",
    value: "1",
    image: "/images/whale_obstacle.png",
    description:
      "A whale coin obstacle witch gives you 3x speed boost for 3 seconds.",
  },
  {
    label: "Text Obstacle",
    value: "2",
    image: "/images/wagmi_obstacle.png",
    description: "A WAGMI text obstacle.",
  },
  {
    label: "Poop Obstacle",
    value: "3",
    image: "/images/poop_obstacle.webp",
    description:
      "A poop coin obstacle which reduces your speed by 90% for 4 seconds.",
  },
  {
    label: "Candle Obstacle",
    value: "4",
    image: "/images/candle_obstacle.webp",
    description: "A candle obstacle.",
  },
];
