import React from "react";
import { redirect } from "next/navigation";

import { isLoggedIn } from "~/lib/actions/auth";

import { Gameplay } from "../_components/gameplay";

type Props = React.PropsWithChildren;

export default async function SigninLayout({ children }: Props) {
  if (await isLoggedIn()) {
    redirect("/tracks");
  }

  return (
    <div className="flex h-screen items-center justify-evenly gap-10 px-10">
      <div className="absolute inset-0 -z-30 h-[30rem] w-full overflow-hidden bg-[linear-gradient(180deg,_rgba(57,_53,_255,_0.7)_9.33%,_rgba(108,_105,_255,_0)_100%)]" />

      <div className="pointer-events-none absolute inset-0 -z-30 size-full h-[60vh] w-full overflow-hidden opacity-50 [perspective:200px]">
        {/* Grid Pattern */}
        <div className="absolute inset-0 [transform:rotateX(145deg)]">
          <div className="[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)] [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]" />
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90%" />
      </div>

      <main className="flex h-full flex-col items-center justify-center gap-2 md:gap-4 lg:gap-6 xl:gap-8">
        {children}
      </main>

      <div className="mt-5 hidden w-full max-w-3xl lg:flex lg:flex-col lg:justify-center xl:mt-10">
        <Gameplay from="signin" />
      </div>
    </div>
  );
}
