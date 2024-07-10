"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Footer } from "~/components/site-footer/footer";
import { Navbar } from "~/components/site-header/navbar";
import { cn } from "~/lib/utils";

const excludePaths = ["/signin", "/tracks"];

export default function Layout({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <div className={cn(pathname !== "/signin" && "my-20 md:my-40")}>
        {children}
      </div>
      {!excludePaths.includes(pathname) && <Footer />}
    </>
  );
}
