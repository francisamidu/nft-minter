import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
} from "react";
import Asset from "../types/Asset";

const AssetsContext = createContext<{
  nft: Asset;
  setNft: Dispatch<SetStateAction<Asset[]>>;
}>({
  nft: null,
  setNft: () => {},
});

export const AssetsContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [nft, setNft] = useState(null);

  return (
    <AssetsContext.Provider
      value={{
        nft,
        setNft,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = () => useContext(AssetsContext);
