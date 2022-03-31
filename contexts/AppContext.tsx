import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { useContract } from ".";

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "NFTMinter",
  supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
  rpc: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1337, 1, 3, 4, 56, 137],
});

const INFURA_ID = process.env.INFURA_ID;

type AppValues = {
  account: string;
  active: boolean;
  balance: string;
  name: string;
  year: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchNetwork: () => Promise<void>;
};
const AppContext = createContext<{
  account: string;
  active: boolean;
  balance: string;
  name: string;
  year: number;
  setData: Dispatch<SetStateAction<AppValues>>;
  connectWallet: (wallet: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
}>({
  account: "",
  active: false,
  balance: "0",
  name: "",
  year: 0,
  setData: () => {},
  connectWallet: async (wallet: string) => {},
  disconnectWallet: async () => {},
});

export const AppContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState({
    active: true,
    account: "",
    balance: "0",
    name: "NFTMinter",
    year: new Date().getFullYear(),
  });

  const contractContext = useContract();

  const { activate, deactivate, account, active } = useWeb3React();

  useEffect(() => {
    if (active) {
      setBalance();
      setData({
        ...data,
        active,
      });
    }
  }, [active]);

  const connectWallet = async (wallet: string) => {
    try {
      switch (wallet) {
        case "coinbase": {
          await activate(CoinbaseWallet);
          break;
        }
        case "walletconnect": {
          await activate(WalletConnect);
        }
        default: {
          await activate(Injected);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect to wallet");
    }
  };

  const setBalance = async () => {
    if (active && contractContext?.provider) {
      const balance = await contractContext?.provider.getBalance(account);
      setData({
        ...data,
        account,
      });
      setData({
        ...data,
        balance: balance.toString(),
      });
    }
  };

  const disconnectWallet = async () => {
    try {
      await deactivate();
    } catch (error) {
      toast.error("Couldnt disconnect wallet");
    }
  };

  return (
    <AppContext.Provider
      value={{ ...data, disconnectWallet, connectWallet, setData }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
