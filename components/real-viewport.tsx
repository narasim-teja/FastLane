"use client";

import React from "react";

/** @see https://css-tricks.com/the-trick-to-viewport-units-on-mobile */
export function RealViewport() {
  const onWindowResize = React.useCallback(() => {
    document.documentElement.style.setProperty(
      "--vw",
      document.documentElement.clientWidth * 0.01 + "px"
    );

    document.documentElement.style.setProperty(
      "--dvh",
      window.innerHeight * 0.01 + "px"
    );

    document.documentElement.style.setProperty(
      "--svh",
      document.documentElement.clientHeight * 0.01 + "px"
    );

    document.documentElement.style.setProperty("--lvh", "1vh");
  }, []);

  React.useLayoutEffect(() => {
    window.addEventListener("resize", onWindowResize, false);
    onWindowResize();

    return () => {
      window.removeEventListener("resize", onWindowResize, false);
    };
  }, [onWindowResize]);

  return null;
}
