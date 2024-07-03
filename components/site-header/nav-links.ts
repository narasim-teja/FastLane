import { TrafficCone } from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  // {
  //   label: "Marketplace",
  //   href: "/marketplace",
  //   icon: Store,
  // },
  {
    label: "Tracks",
    href: "/tracks",
    icon: TrafficCone,
  },
];
