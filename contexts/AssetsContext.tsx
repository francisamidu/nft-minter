import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
} from "react";
import { uid } from "../helpers";
import Asset from "../types/Asset";

const AssetsContext = createContext<{
  nfts: Asset[];
  nft: Asset;
  setNfts: Dispatch<SetStateAction<Asset[]>>;
}>({
  nfts: [],
  nft: null,
  setNfts: () => {},
});

export const AssetsContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [nfts, setNfts] = useState([
    {
      id: uid(),
      image: "/9814.jpg",
      description: "First NFT",
      title: "Cool",
      price: "3.0",
      sold: false,
    },
    {
      id: uid(),
      image: "/29932.jpg",
      description: "Zapper",
      title: "What it is",
      price: "2.0",
      sold: false,
    },
    {
      id: uid(),
      image: "/3081783.jpg",
      description: "Expensive NFT",
      title: "Cool",
      price: "18.0",
      sold: false,
    },
    {
      id: uid(),
      image: "/5409458.jpg",
      description: "On Everything",
      title: "Drip",
      price: "33.0",
      sold: true,
    },
  ]);
  const [nft, setNft] = useState(null);

  return (
    <AssetsContext.Provider value={{ nfts, nft, setNfts }}>
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = () => useContext(AssetsContext);
