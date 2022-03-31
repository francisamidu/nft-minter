import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Contract, ethers } from "ethers";
import {
  ERC1155NFTAddress,
  ERC721NFTAddress,
  ERC1155Abi,
  ERC721Abi,
} from "../config";
import { useAssets } from ".";
import { toast } from "react-toastify";
import { getProvider } from "../helpers";
import { Provider } from "@ethersproject/providers";

const ContractContext = createContext(null);
export const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const { nfts, setNfts } = useAssets();

  const [ERC1155Contract, setERC1155Contract] = useState<Contract>(null);
  const [ERC721Contract, setERC721Contract] = useState<Contract>(null);
  const [provider, setProvider] = useState<Provider>(null);
  const loadUserNFTs = async (contract: Contract) => {
    try {
      const isERC1155 = contract.address === ERC1155NFTAddress;
      if (isERC1155) {
        let tokenIds = await contract._tokenId();
        tokenIds = tokenIds.toNumber();
        let items = [];
        for (let id = 0; id <= tokenIds; id++) {
          if (id) {
            const tokenUri = await contract.uri(id);
            let item = await contract.idToTokenItem(id);
            item = {
              amount: item.tokens.toNumber(),
              id: item.tokenId.toNumber(),
              owner: item.owner,
              tokenUri,
            };
            items.push(item);
          }
        }
        setNfts([...nfts, ...items]);
      } else {
        let tokenIds = await contract._tokenIds();
        tokenIds = tokenIds.toNumber();
        let items = [];

        for (let id = 0; id <= tokenIds; id++) {
          if (id) {
            const tokenUri = await contract.tokenURI(id);
            let item = await contract.idToTokenItem(id);
            item = {
              id: Number(item._tokenId.toString()),
              owner: item._owner,
              createdAt: new Date(Number(item._createdAt.toString())),
              tokenUri,
            };
            setNfts([...nfts, ...items]);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setNfts(nfts);
      toast.error("Couldnt get NFT data");
    }
  };
  useEffect(() => {
    //Blockchain config
    const provider = getProvider();
    const wallet = ethers.Wallet.fromMnemonic(
      process.env.NEXT_PUBLIC_MNEMONIC
    );
    const signer = wallet.connect(provider);
    setProvider(provider);
    const ERC1155Contract = new ethers.Contract(
      ERC1155NFTAddress,
      ERC1155Abi,
      signer
    );
    const ERC721Contract = new ethers.Contract(
      ERC721NFTAddress,
      ERC721Abi,
      signer
    );
    setERC1155Contract(ERC1155Contract);
    setERC721Contract(ERC721Contract);
    loadUserNFTs(ERC1155Contract);
    loadUserNFTs(ERC721Contract);
  }, []);

  return (
    <ContractContext.Provider
      value={{
        loadUserNFTs,
        ERC1155Contract,
        ERC721Contract,
        provider,
      }}
    >
      {children}{" "}
    </ContractContext.Provider>
  );
};
export const useContract = () => useContext(ContractContext);
