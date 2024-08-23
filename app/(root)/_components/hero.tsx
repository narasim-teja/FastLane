import { WaitlistForm } from "~/components/waitlist-form";
import { siteConfig } from "~/config/site";

export function Hero() {
  return (
    <div className="mt-36 space-y-10 lg:mt-0 lg:grid lg:h-[calc(100dvh-10rem)] lg:place-items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="space-x-4 *:rounded-3xl *:px-4 *:text-xs md:*:text-sm lg:*:text-base">
          <span className="border-2 bg-foreground text-background">
            3d Game
          </span>
          <span className="border-2">Web3</span>
        </div>

        <h1 className="bg-gradient-to-r from-white/10 from-15% via-white to-white/5 to-100% bg-clip-text text-center text-4xl font-semibold leading-[3.5rem] text-transparent [-webkit-text-stroke:_1px_rgba(255,_255,_255,_0.25)] md:text-[6rem] md:leading-[9rem] lg:text-[8rem]">
          Welcome to {siteConfig.name}
        </h1>

        <p className="text-[13px] font-light text-neutral-400 md:text-xl lg:text-[26px]">
          {siteConfig.description}
        </p>

        <WaitlistForm />
      </div>
    </div>
  );
}
