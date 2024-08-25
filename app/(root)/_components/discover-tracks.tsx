import { Ellipse } from "~/components/icons";
import { Tracks } from "~/components/tracks";

export function DiscoverTracks() {
  return (
    <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center gap-10 px-7 pt-7 md:pt-10">
      <h2 className="bg-gradient-to-b from-foreground to-stone-500 bg-clip-text font-poppins text-2xl font-semibold text-transparent md:text-3xl lg:h-14 lg:text-5xl">
        Discover Exiciting tracks
      </h2>

      <Tracks />

      {/* <Image
        loading="eager"
        src="/ellipse.png"
        alt={`${siteConfig.name} ellipse`}
        height={960}
        width={960}
        className="pointer-events-none absolute -bottom-10 z-20 md:-bottom-40 lg:left-36"
      /> */}

      <Ellipse className="pointer-events-none absolute -bottom-10 z-20 h-fit w-screen md:-bottom-40 md:h-[422px] lg:left-36 lg:h-[422px] lg:w-[942px]" />
    </div>
  );
}
