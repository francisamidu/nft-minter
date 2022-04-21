import React from "react";
import Image from "next/image";
import { Asset } from "../types";
import { formatCurrency } from "../helpers";

type NFTItemProps = {
  nft: Asset;
  index: number;
  length: number;
};
const NFTItem = ({
  nft: { image, price, sold, title, seller },
  index,
  length,
}: NFTItemProps) => {
  return (
    <div
      className={`rounded-md relative flex flex-col 
    sm:col-start-${index === 0 ? 1 : ++index} sm:col-end-${
        index === 0 ? 2 : length - ++index === 0 ? ++index : length
      } min-h-[150px] transition-colors duration-300 shadow sm:mr-3 mb-3 nft-item`}
    >
      <p className="m-3">
        Sold by <span className="text-gray-[#888]">@{seller}</span>
      </p>
      <div className="flex flex-row justify-center place-center">
        <Image
          src={image}
          width="300"
          height="285"
          layout="intrinsic"
          className="rounded-md"
        />
      </div>
      <div className="p-4 sm:text-left">
        <h1 className="font-bold text-xl relative">{title}</h1>
        <p className="mt-2">
          Price:{" "}
          <span className="font-bold">{formatCurrency(Number(price))}</span>
        </p>
        <p className="mt-2">
          Sold:{" "}
          <span
            className={`${sold ? "text-green-500" : "text-red-500"} font-bold`}
          >
            {sold ? "Yes" : "No"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NFTItem;
