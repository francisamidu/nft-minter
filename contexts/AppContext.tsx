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
import { useContract } from ".";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {
  ERC721NFTAddress,
  ERC721Abi,
  ERC1155NFTAddress,
  ERC1155Abi,
} from "../config";

type AppValues = {
  account: string;
  active: boolean;
  balance: string;
  darkMode: boolean;
  name: string;
  year: number;
  connectWallet: () => Promise<void>;
};
const AppContext = createContext<
  Partial<{
    account: string;
    active: boolean;
    balance: string;
    darkMode: boolean;
    name: string;
    year: number;
    setData: Dispatch<SetStateAction<Partial<AppValues>>>;
    connectWallet: () => Promise<void>;
  }>
>({
  account: "",
  active: false,
  balance: "",
  darkMode: false,
  name: "",
  year: 0,
  setData: () => {},
  connectWallet: async () => {},
});

export const AppContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState({
    darkMode: false,
    name: "NFTMinter",
    year: new Date().getFullYear(),
  });

  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");
  const [active, setActive] = useState(false);

  const { setERC1155Contract, setERC721Contract, setProvider } = useContract();

  const connectWallet = async () => {
    try {
      const modal = new Web3Modal();
      const connection = await modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      //set NFT contracts
      const ERC721Contract = new ethers.Contract(
        ERC721NFTAddress,
        ERC721Abi,
        signer
      );
      setERC721Contract(ERC721Contract);

      const ERC1155Contract = new ethers.Contract(
        ERC1155NFTAddress,
        ERC1155Abi,
        signer
      );
      setERC1155Contract(ERC1155Contract);

      const signerAddress = await signer.getAddress();
      const accountBalance = (
        await provider.getBalance(signerAddress)
      ).toString();
      setAccountDetails(signerAddress, accountBalance);
      setProvider(provider);
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect to wallet");
    }
  };

  const setAccountDetails = async (
    accountAddress: string,
    accountBalance: string
  ) => {
    try {
      setBalance(accountBalance);
      setActive(true);
      setAccount(accountAddress);
    } catch (error) {
      toast.error("Whoops failed to set account data");
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...data,
        account,
        active,
        balance,
        connectWallet,
        setData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
