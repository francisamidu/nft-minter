import React from "react";
import Image from "next/image";

import { Button } from ".";
import { Asset } from "../types";

type NFTCardProps = {
  nft: Partial<Asset>;
  buyNft: (nft: any) => Promise<void>;
  page?: string;
};
const NFTCard = ({ nft, buyNft, page = "index" }: NFTCardProps) => {
  const { id, image, description, title, price } = nft;
  return (
    <div className="p-4 shadow min-w-300 flex-1 max-w-320 sm:my-4 sm:mr-4 my-0 mr-0 rounded-md bg-[#ee]">
      <Image
        src={image}
        layout="responsive"
        width="400"
        height="300"
        className="w-full rounded-md"
      />
      {page === "index" ? (
        <div className="py-2 text-center">
          <h1 className="font-bold text-2xl capitalize color-dark-blue">
            {title} #{id}
          </h1>
          <p>Token Id: #{id}</p>
          <p>Selling For: {price} Eth</p>
          <p className="text-gray-600 italic">{description}</p>
          <div className="flex flex-row items-center justify-center">
            <Button
              text="Buy NFT"
              className="mt-4 btn-purple w-full"
              onClick={() => buyNft(nft)}
            />
          </div>
        </div>
      ) : (
        <div className="py-2">
          <h1 className="font-bold text-2xl capitalize color-dark-blue">
            {title}
          </h1>
          <p className="color-teal font-bold">{price} Eth</p>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
