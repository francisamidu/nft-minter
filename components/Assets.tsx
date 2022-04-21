import { Contract } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NFTItem } from ".";
import { ERC1155NFTAddress } from "../config";
import { useApp, useContract } from "../contexts";
import { uid } from "../helpers";

const Asset = () => {
  const { active, account } = useApp();
  const { ERC1155Contract, ERC721Contract } = useContract();
  const [erc721NFTs, setErc721Nfts] = useState([]);
  const [erc1155NFTs, setErc1155Nfts] = useState([]);
  const [assets, setAssets] = useState([]);
  const loadUserNFTs = async (contract: Contract) => {
    try {
      const isERC1155 = contract?.address === ERC1155NFTAddress;
      if (!ERC1155Contract && !ERC721Contract) {
        toast.error("Connect your wallet first");
        return;
      }
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
              createdAt: new Date(item?.createdAt?.Number()) || new Date(),
              id: item?.tokenId?.toNumber() || uid(),
              owner: item?.owner,
              image: tokenUri,
            };
            items.push(item);
          }
        }
        setErc1155Nfts(items);
      } else {
        let tokenIds = await contract._tokenIds();
        tokenIds = tokenIds.toNumber();
        let items = [];

        for (let id = 0; id <= tokenIds; id++) {
          if (id) {
            const tokenUri = await contract.tokenURI(id);
            let item = await contract.idToTokenItem(id);
            item = {
              id: Number(item?._tokenId?.toNumber()) || uid(),
              owner: item?._owner,
              createdAt: new Date(item?._createdAt?.toNumber()),
              image: tokenUri,
            };
            items.push(item);
          }
        }
        setErc721Nfts(items);
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldnt get NFT data");
    }
    setAssets([erc1155NFTs, erc721NFTs].flat(Infinity));
  };

  useEffect(() => {
    if (ERC1155Contract) {
      loadUserNFTs(ERC1155Contract);
    }
  }, [ERC1155Contract]);

  useEffect(() => {
    if (ERC721Contract) {
      loadUserNFTs(ERC721Contract);
    }
  }, [ERC721Contract]);
  if (!active && !account) toast.error("Connect wallet to see your assets");
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
