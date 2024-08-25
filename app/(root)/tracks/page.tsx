import { GradientBall1, GradientBall2 } from "~/components/icons";
import { Tracks } from "~/components/tracks";
import { siteConfig } from "~/config/site";

export default function TracksPage() {
  return (
    <div className="relative z-0 grid min-h-screen place-items-center py-28 md:py-0">
      <div className="absolute inset-0 -z-30 h-[30rem] w-full overflow-hidden bg-[linear-gradient(180deg,_rgba(57,_53,_255,_0.7)_9.33%,_rgba(108,_105,_255,_0)_100%)]">
        <h2 className="bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.28)_0%,_rgba(255,_255,_255,_0)_77.72%)] bg-clip-text text-center font-poppins text-[28vw] font-semibold uppercase text-transparent md:-m-12 md:leading-none">
          Track
        </h2>
      </div>

      <GradientBall1 className="absolute left-[53%] top-1/3 -z-20 hidden size-52 blur-[2px] md:block lg:scale-[2]" />

      <GradientBall2 className="absolute -left-1/4 top-10 -z-20 size-80 scale-125 blur-[1px] sm:left-0 md:left-[32%] lg:scale-150" />

      <div className="flex max-w-5xl flex-col items-center justify-center gap-10 md:mt-20">
        <h1 className="pb-10 text-center font-poppins text-3xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
          Choose a track to start your journey
        </h1>

        <div className="flex w-full justify-center">
          <Tracks />
        </div>

        <p className="text-xl">or</p>

        <div className="mx-4 rounded-lg bg-foreground/10 px-6 py-2.5 sm:mx-0">
          <p className="text-center text-xl">
            Have any track ideas? Join our{" "}
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-500 underline underline-offset-4 transition-colors hover:text-blue-600"
            >
              Discord
            </a>{" "}
            server!
          </p>
        </div>
      </div>
    </div>
  );
}
