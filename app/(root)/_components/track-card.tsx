"use client";

import React from "react";

import { AnimatePresence, motion } from "framer-motion";

type TrackCardProps = {
  canvas: React.ReactNode;
  children: React.ReactNode;
};

export const TrackCard = ({ canvas, children }: TrackCardProps) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex size-full max-w-sm items-center justify-center"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 size-full"
          >
            {canvas}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-20 overflow-hidden">{children}</div>
    </div>
  );
};
