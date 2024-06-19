import { InstagramIcon, LinkedInIcon, XIcon } from "../icons";
import { WaitlistForm } from "../waitlist-form";

export function Footer() {
  return (
    <footer className="z-2 mx-auto my-10 flex h-min w-full max-w-screen-lg flex-col items-center justify-center gap-2.5 px-5 *:flex *:size-full *:flex-col *:items-center *:justify-center *:gap-2.5 sm:h-[516px] sm:flex-row sm:gap-10 sm:px-0">
      <div className="flex-[1_1_0px] *:flex *:w-full *:flex-col *:justify-center *:gap-5 *:rounded-3xl *:border-2 *:border-l-[16px] *:bg-background *:p-10">
        <div>
          <div>
            <h3 className="font-cal text-2xl">Join the waitlist!</h3>
            <p>Be the first to know when we launch!</p>
          </div>

          <div className="flex w-full gap-4">
            <WaitlistForm isFooter />
          </div>
        </div>

        <div className="flex-[1_1_0px]">
          <div className="size-full rounded-[inherit] border-2 border-dashed p-2">
            <div className="flex size-full flex-col items-center justify-center gap-4 rounded-[inherit] bg-primary p-4 text-center text-xl text-primary-foreground sm:text-3xl">
              <p className="aspect-square rounded-full border-[3px] border-background p-2 font-cal">
                01
              </p>
              <p className="font-virgil">various links goes here</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-[0.75_0_0px] *:flex *:w-full *:justify-center *:gap-5 *:rounded-3xl *:border-2 *:border-l-[16px] *:bg-background">
        <div className="flex-[1_1_0px] flex-col p-10">
          <div className="size-full rounded-[inherit] border-2 border-dashed p-2">
            <div className="flex size-full flex-col items-center justify-center gap-4 rounded-[inherit] bg-primary p-4 text-center text-xl text-primary-foreground sm:text-3xl">
              <p className="aspect-square rounded-full border-[3px] border-background p-2 font-cal">
                02
              </p>
              <p className="font-virgil">various links goes here</p>
            </div>
          </div>
        </div>

        <div className="gap-2.5 *:flex *:aspect-square *:w-full *:items-center *:justify-center *:gap-2.5">
          <a
            href="https://twitter.com/fastlane_run"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon className="size-12 sm:size-16" />
          </a>

          <a>
            <LinkedInIcon className="size-12 sm:size-16" />
          </a>

          <a>
            <InstagramIcon className="size-12 sm:size-16" />
          </a>
        </div>
      </div>
    </footer>
  );
}
