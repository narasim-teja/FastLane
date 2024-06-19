import { ConnectWallet } from "~/components/connect-wallet";

export default function ConnectWalletPage() {
  return (
    <div className="grid h-screen place-content-center space-y-4">
      <h1 className="text-center font-cal text-4xl drop-shadow sm:text-5xl md:text-6xl lg:text-7xl">
        Connect your wallet
      </h1>

      <ConnectWallet className="mx-auto" />
    </div>
  );
}
