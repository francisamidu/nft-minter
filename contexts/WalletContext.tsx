import { ethers } from "ethers";
import { JsonRpcSigner } from "ethers/node_modules/@ethersproject/providers";
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import Web3Modal from "web3modal";
import {
  ERC1155NFTAddress,
  ERC1155Abi,
  ERC721NFTAddress,
  ERC721Abi,
} from "../config";
import { useContract } from ".";

type Wallet = {
  account: string;
  active: boolean;
  balance: string;
  connectWallet: () => any;
};
const WalletContext = createContext<Wallet>({
  account: "",
  active: false,
  balance: "",
  connectWallet: () => {},
});

export const WalletContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");
  const [active, setActive] = useState(false);
  const { setERC1155Contract, setERC721Contract } = useContract();
  const connectWallet = async () => {
    try {
      const modal = new Web3Modal();
      const connection = await modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const signerAddress = await signer.getAddress();
      const accountBalance = (
        await provider.getBalance(signerAddress)
      ).toString();

      const ERC1155Contract = new ethers.Contract(
        ERC1155NFTAddress,
        ERC1155Abi,
        provider
      );
      const ERC721Contract = new ethers.Contract(
        ERC721NFTAddress,
        ERC721Abi,
        provider
      );
      setERC1155Contract(ERC1155Contract);
      setERC721Contract(ERC721Contract);

      setAccount(signerAddress);
      setActive(true);
      setBalance(accountBalance);
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect to wallet");
    }
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        active,
        balance,
        connectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
