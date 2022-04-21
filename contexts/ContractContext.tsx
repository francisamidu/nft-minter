import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Contract } from "ethers";

const ContractContext = createContext(null);
export const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const [ERC1155Contract, setERC1155Contract] = useState<Contract>(null);
  const [ERC721Contract, setERC721Contract] = useState<Contract>(null);

  return (
    <ContractContext.Provider
      value={{
        ERC1155Contract,
        setERC1155Contract,
        setERC721Contract,
        ERC721Contract,
      }}
    >
      {children}{" "}
    </ContractContext.Provider>
  );
};
export const useContract = () => useContext(ContractContext);
