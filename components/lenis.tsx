"use client";

import * as Lenis from "lenis/react";

export const ReactLenis: React.FC<Lenis.LenisProps> = (props) => {
  return (
    <Lenis.ReactLenis
      root
      options={{
        prevent: (node) =>
          node.classList.contains("wallet-list__scroll-container"), // prevent scroll on dynamic wallet list
        ...props.options,
      }}
      {...props}
    />
  );
};
