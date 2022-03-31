import React from "react";
import NFTCard from "./NFTCard";
import Asset from "../types/Asset";
import { useAssets } from "../contexts";

const NFTList = ({ page, assets, buyNft }: any) => {
  const { nfts } = useAssets();
  const assetList: Asset[] = assets ? assets : nfts;
  return (
    <section
      className={`${
        assetList.length > 0
          ? "p-4 flex flex-row items-center flex-wrap justify-between mt-10"
          : "flex flex-row items-center justify-center mt-10 min-h-screen"
      } bg-inherit`}
    >
      {assetList.length > 0 ? (
        assetList.map((nft) => (
          <NFTCard buyNft={buyNft} nft={nft} key={nft.id} page={page} />
        ))
      ) : (
        <div className="flex flex-col self-center justify-center py-4 px-5">
          <h1 className="text-2xl font-bold">No Digital Assets available.</h1>
        </div>
      )}
    </section>
  );
};

export default NFTList;
