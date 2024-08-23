import React from "react";

import { Footer } from "~/components/site-footer/footer";
import { Navbar } from "~/components/site-header/navbar";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
