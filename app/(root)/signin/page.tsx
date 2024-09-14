import { ConnectEmbed } from "thirdweb/react";

import { thirdwebProps } from "~/lib/thirdweb/props";

export const metadata = {
  title: "Connect your Wallet and SignIn to your account",
  description: "Connect your wallet to access your account and start playing.",
};

export default async function ConnectWalletPage() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="font-cal text-center text-2xl drop-shadow sm:text-3xl md:text-4xl">
          Signin
        </h1>

        <p className="max-w-xs text-center text-xs text-muted-foreground md:text-sm">
          Connect your wallet to access your account and start playing.
        </p>
      </div>

      <ConnectEmbed {...thirdwebProps} />
    </>
  );
}
