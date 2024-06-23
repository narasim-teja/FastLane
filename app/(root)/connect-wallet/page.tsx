import { redirect } from "next/navigation";

import { ConnectWallet } from "~/components/connect-wallet";
import { isLoggedIn } from "~/lib/actions/auth";

export const metadata = {
  title: "Connect your Wallet and SignIn to your account",
  description: "Connect your wallet to access your account and start playing.",
};

export default async function ConnectWalletPage() {
  if (await isLoggedIn()) {
    redirect("/tracks");
  }

  return (
    <div className="grid h-screen place-content-center space-y-4">
      <h1 className="text-center font-cal text-4xl drop-shadow sm:text-5xl md:text-6xl lg:text-7xl">
        Connect your wallet
      </h1>

      <ConnectWallet className="mx-auto" />
    </div>
  );
}
