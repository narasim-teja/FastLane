import Link from "next/link";

import { Gamepad, MoveLeft } from "lucide-react";

import { Separator } from "~/components/ui/separator";
import { siteConfig } from "~/config/site";

export default function NotFoundPage() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="space-y-4 rounded-4xl border-dashed bg-white p-4 sm:border md:p-8 md:py-12">
        <p className="inline-flex items-center gap-2 font-cal text-4xl lowercase">
          <Gamepad className="size-10" /> {siteConfig.name}
        </p>
        <Separator />

        <h1 className="font-cal text-3xl md:text-4xl">404 - Page Not Found</h1>
        <p className="max-w-2xl font-matter">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex text-blue-500 underline-offset-4 transition hover:text-blue-600 hover:underline"
        >
          <MoveLeft className="mr-2" />
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
