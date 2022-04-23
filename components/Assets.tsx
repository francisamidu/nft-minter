import { Contract, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NFTItem } from ".";
import { useWallet } from "../contexts";
import { uid } from "../helpers";
import {
  ERC1155Abi,
  ERC1155NFTAddress,
  ERC721Abi,
  ERC721NFTAddress,
} from "../config";

const Asset = () => {
  const { active, account } = useWallet();
  const [erc721NFTs, setErc721Nfts] = useState([]);
  const [erc1155NFTs, setErc1155Nfts] = useState([]);
  const [assets, setAssets] = useState([]);
  const loadUserNFTs = async (contract: Contract) => {
    try {
      const isERC1155 = contract?.address === ERC1155NFTAddress;
      if (isERC1155) {
        let tokenIds = await contract?._tokenId();
        tokenIds = tokenIds.toNumber();
        let items = [];
        for (let id = 0; id <= tokenIds; id++) {
          if (id) {
            let tokenUri = await contract?.uri(id);
            const request = await fetch(tokenUri);
            const meta = await request.json();
            console.log(meta);
            let item = await contract?.idToTokenItem(id);
            item = {
              amount: item.tokens.toNumber(),
              createdAt: new Date(item?.createdAt?.Number()) || new Date(),
              id: item?.tokenId?.toNumber() || uid(),
              owner: item?.owner,
              image: meta.image,
              name: meta.name,
              description: meta.description,
              tokenUri,
            };
            console.log(item);
            items.push(item);
          }
        }
        setAssets([...assets, items]);
      } else {
        let tokenIds = await contract._tokenIds();
        tokenIds = tokenIds.toNumber();
        let items = [];

        for (let id = 0; id <= tokenIds; id++) {
          if (id) {
            const tokenUri = await contract.tokenURI(id);
            const request = await fetch(tokenUri);
            const meta = await request.json();
            let item = await contract.idToTokenItem(id);
            item = {
              id: Number(item?._tokenId?.toNumber()) || uid(),
              owner: item?._owner,
              createdAt: new Date(item?._createdAt?.toNumber()),
              image: meta.image,
              name: meta.name,
              description: meta.description,
              tokenUri,
            };
            items.push(item);
          }
        }
        setAssets([...assets, items]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldnt get NFT data");
    }
  };
  const loadAssets = () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        `https://ropsten.infura.io/v3/f8a9c7c9680045a78680e5988d5edc3e`
      );

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
      loadUserNFTs(ERC1155Contract);
      loadUserNFTs(ERC721Contract);
    } catch (error) {
      console.log(error);
      toast.error("Couldnt load assets");
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);
  return (
    <section className="p-4">
      {assets.length ? (
        <>
          <h1 className="font-bold text-2xl mb-4">Owned NFTs</h1>
          <div className="nft-list min-h-screen pt-5 mt-5 grid w-full">
            {assets.map((item, index) => (
              <NFTItem
                nft={item}
                key={item.id}
                index={index}
                length={assets.length}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-row items-center justify-center">
          <h2 className="text-center">No Assets to show</h2>
        </div>
      )}
    </section>
  );
};

export default Asset;
