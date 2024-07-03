import { Info } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function Help() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed right-4 top-4 z-10 shrink-0 border border-white/20 bg-white/20 shadow backdrop-blur hover:bg-white/35 md:bottom-4 md:top-auto"
        >
          <Info className="text-muted" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-cal text-3xl tracking-wide">
            Help
          </DialogTitle>
          <DialogDescription>
            Welcome to Fastlane! Here&apos;s a quick guide to get you started.
          </DialogDescription>
        </DialogHeader>

        <div className="text-lg font-medium">
          Not much to see here yet. Figure it out youself or just use the arrow
          keys or WASD to move around.
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
