import { Gamepad2 } from "lucide-react";

export function Gameplay() {
  return (
    <section className="relative z-10 w-full overflow-hidden rounded-4xl border-[3px] border-dashed p-1 duration-1000 animate-in slide-in-from-bottom-[15%]">
      <div className="flex min-h-96 flex-col items-center justify-center rounded-[inherit] bg-primary leading-10 text-background selection:bg-background selection:text-foreground md:min-h-[690px]">
        <Gamepad2 strokeWidth={1} className="size-16 md:size-28" />

        <p className="max-w-lg text-center font-virgil text-2xl font-semibold lowercase leading-normal md:max-w-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          A Video Clip of Gameplay or a r3f component goes here
        </p>
      </div>
    </section>
  );
}
