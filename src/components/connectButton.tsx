import { ConnectButton } from "@rainbow-me/rainbowkit";
import PlayButton from "../games/automata/components/Buttons/PlayButton";

export default function ConnectButtonRain({ onSign }: { onSign: () => void }) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return ready
          ? (() => {
              if (!connected) {
                return (
                  <PlayButton
                    // text={"Connect Wallet"}
                    onClick={openConnectModal}
                  />
                );
              }
              if (chain.unsupported) {
                return (
                  <PlayButton text={"Wrong network"} onClick={openChainModal} />
                );
              }
              return <PlayButton onClick={onSign} />;
            })()
          : null;
      }}
    </ConnectButton.Custom>
  );
}
