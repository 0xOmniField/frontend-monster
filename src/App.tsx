import { GameController as AutomataController } from "./games/automata/controller";
import { loginL1AccountAsync, setL1AllAccount } from "./data/accountSlice";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import "./App.css";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

function App() {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected, chainId } = useAccount();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isConnected) {
      openConnectModal?.();
    } else {
      dispatch(
        setL1AllAccount({
          address,
          chainId,
        })
      );
    }
    // dispatch(loginL1AccountAsync());
  }, [isConnected]);

  return (
    <>
      <div className="preload" />
      <AutomataController />
    </>
  );
}

export default App;
