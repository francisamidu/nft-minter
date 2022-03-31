import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-toastify";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "NFTMinter",
  supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

const INFURA_ID = process.env.INFURA_ID;

type AppValues = {
  account: string;
  balance: string;
  name: string;
  year: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchNetwork: () => Promise<void>;
};
const AppContext = createContext<{
  account: string;
  balance: string;
  name: string;
  year: number;
  setData: Dispatch<SetStateAction<AppValues>>;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}>({
  account: "",
  balance: "0",
  name: "",
  year: 0,
  setData: () => {},
  connectWallet: async () => {},
  disconnectWallet: async () => {},
});

export const AppContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState({
    account: "",
    balance: "0",
    name: "NFTMinter",
    year: new Date().getFullYear(),
  });
  const { activate, deactivate, active, chainId, account } = useWeb3React();

  const connectWallet = async () => {
    try {
      // <button onClick={() => { activate(CoinbaseWallet) }>Coinbase Wallet</button>
      // <button onClick={() => { activate(WalletConnect) }>Wallet Connect</button>
      // <button onClick={() => { activate(Injected) }>Metamask</button>
      // <button onClick={deactivate}>Disconnect</button>
      // setData({
      //   ...data,
      //   account: wallets[0].accounts[0].address,
      // });
      // setData({
      //   ...data,
      //   balance: String(wallets[0].accounts[0].balance),
      // });
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect to wallet");
    }
  };

  const disconnectWallet = async () => {
    try {
      await deactivate();
    } catch (error) {
      toast.error("Couldnt disconnect wallet");
    }
  };
  const { library } = useWeb3React();

  return (
    <AppContext.Provider value={{ ...data, connectWallet, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
