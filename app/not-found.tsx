import Image from "next/image";

import { Navbar } from "~/components/site-header/navbar";
import { Button } from "~/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="relative z-0 grid h-screen place-items-center">
      <Navbar />

      <Image
        src="/404_bg.png"
        alt="404 - Not Found"
        fill
        className="-z-20 object-cover"
      />

      <div className="absolute inset-0 -z-20 h-[30rem] w-full overflow-hidden">
        <h2 className="mt-8 bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.06)_40.23%,_rgba(0,_0,_0,_0.01)_100%)] bg-clip-text text-center font-poppins text-[50vw] font-semibold uppercase text-transparent md:leading-none lg:text-[32vw]">
          404
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-poppins text-4xl font-bold md:text-5xl">
            Seems like we&apos;ve lost you. <br />
          </h1>

          <p>For nerds, 404</p>
        </div>

        <Button
          href="/"
          round
          className="mx-auto px-4 text-base shadow-[0px_4px_14.9px_0px_#986001]"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
