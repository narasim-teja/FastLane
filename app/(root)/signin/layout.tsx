import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { siteConfig } from "~/config/site";
import { isLoggedIn } from "~/lib/actions/auth";

type Props = React.PropsWithChildren;

export default async function SigninLayout({ children }: Props) {
  if (await isLoggedIn()) {
    redirect("/tracks");
  }

  return (
    <div className="grid h-screen lg:grid-cols-2">
      <div className="hidden h-full border-r border-zinc-300 p-10 lg:flex lg:flex-col lg:justify-between lg:p-20">
        <div className="mt-10 flex size-full flex-col justify-center gap-10 rounded-md">
          <Image
            src="/placeholder.svg"
            width={1280}
            height={640}
            alt={siteConfig.name}
            className="mx-auto max-w-md rounded-lg object-cover duration-1000 animate-in zoom-in-50"
          />

          <div className="text-center">
            <h2 className="font-cal text-5xl lowercase">{siteConfig.name}</h2>
            <em className="font-matter text-2xl font-medium text-muted-foreground">
              {siteConfig.description}
            </em>
          </div>
        </div>
      </div>

      <main className="flex h-full flex-col items-center justify-center gap-2 md:gap-4 lg:gap-6 xl:gap-8">
        {children}
      </main>
    </div>
  );
}
