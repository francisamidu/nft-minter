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
  darkMode: boolean;
  name: string;
  year: number;
};
const AppContext = createContext<
  Partial<{
    darkMode: boolean;
    name: string;
    year: number;
    setData: Dispatch<SetStateAction<Partial<AppValues>>>;
  }>
>({
  darkMode: false,
  name: "",
  year: 0,
  setData: () => {},
});

export const AppContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState({
    darkMode: false,
    name: "NFTMinter",
    year: new Date().getFullYear(),
  });

  return (
    <AppContext.Provider
      value={{
        ...data,
        setData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
