"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Footer } from "~/components/site-footer/footer";
import { Navbar } from "~/components/site-header/navbar";

export default function Layout({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      {children}
      {pathname !== "/tracks" && <Footer />}
    </>
  );
}
