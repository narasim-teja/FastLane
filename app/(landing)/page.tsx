import { RetroGrid } from "~/components/magic-ui/retro-grid";
import { WaitlistForm } from "~/components/waitlist-form";

import { Gameplay } from "./_components/gameplay";
import { Hero } from "./_components/hero";
import { Tracks } from "./_components/tracks";

export default function LandingPage() {
  return (
    <main className="relative my-20 md:my-40">
      <RetroGrid className="fixed top-0 -z-10" />

      <div className="container flex flex-col items-center gap-8 md:gap-16">
        <Hero />
        <WaitlistForm />
        <Gameplay />
        <Tracks />
      </div>
    </main>
  );
}
