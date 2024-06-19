import Image from "next/image";

import { Plus } from "lucide-react";

import { WobbleCard } from "~/components/aceternity-ui/wobble-card";

const tracks = [
  {
    title: "Gold",
    description: "The classic Fastlane experience",
    image: "/placeholder.svg",
  },
  {
    title: "Eth",
    description: "The Premium Fastlane experience",
    image: "/placeholder.svg",
  },
];

const communityTracks = [
  {
    title: "Base",
    description: "The Fastlane experience on base network",
    image: "/placeholder.svg",
  },
];

export function Tracks() {
  return (
    <section className="space-y-10">
      <h2 className="text-center font-cal text-3xl drop-shadow md:text-4xl lg:text-5xl xl:text-6xl">
        Choose a track to play on
      </h2>

      <div className="flex flex-wrap items-center justify-around gap-10">
        {tracks.map((track, i) => (
          <WobbleCard
            key={i}
            containerClassName="rounded-4xl bg-transparent border-2 p-4 border-dashed h-[500px] w-[380px]"
            className="flex max-w-fit flex-col bg-[#ebebeb] py-10"
          >
            <div className="text-center">
              <h3 className="font-matter text-3xl font-semibold">
                {track.title}
              </h3>
              <p className="text-lg font-medium">{track.description}</p>
            </div>

            <div className="">
              <Image
                src={track.image}
                alt={track.title}
                width={300}
                height={400}
              />
            </div>
          </WobbleCard>
        ))}
      </div>

      <h2 className="text-center font-cal text-3xl drop-shadow md:text-4xl lg:text-5xl xl:text-6xl">
        Community tracks
      </h2>

      <div className="flex flex-wrap items-center justify-around gap-10">
        {communityTracks.map((track, i) => (
          <WobbleCard
            key={i}
            containerClassName="rounded-4xl bg-transparent border-2 p-4 border-dashed h-[500px] w-[380px]"
            className="flex max-w-fit flex-col bg-[#ebebeb] py-10"
          >
            <div className="text-center">
              <h3 className="font-matter text-3xl font-semibold">
                {track.title}
              </h3>
              <p className="text-lg font-medium">{track.description}</p>
            </div>

            <div className="">
              <Image
                src={track.image}
                alt={track.title}
                width={300}
                height={400}
              />
            </div>
          </WobbleCard>
        ))}

        <WobbleCard
          containerClassName="rounded-4xl bg-transparent border-2 p-4 border-dashed h-[500px] w-[380px]"
          className="flex max-w-fit flex-col bg-[#ebebeb] py-10"
        >
          <div className="flex size-full h-full flex-col items-center justify-center gap-4">
            <Plus
              size={64}
              className="rounded-full border border-dashed bg-muted p-1"
            />

            <p className="text-center text-lg font-medium">
              Have a track idea?
              <br />
              <a
                href="https://discord.gg/fastlane"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-500"
              >
                Join our Discord
              </a>{" "}
              and let us know!
            </p>
          </div>
        </WobbleCard>
      </div>
    </section>
  );
}
