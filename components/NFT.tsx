import React from "react";
import Image from "next/image";

import { Asset } from "../types";

const NFT = ({ title, image, price, owner }: Partial<Asset>) => {
  return (
    <div className="py-2 rounded-xl shadow min-w-[320px]">
      <Image
        src={image}
        layout="responsive"
        width="400"
        height="300"
        className="w-full rounded-xl"
      />
      <div className="p-3">
        <p className="font-bold">{title}</p>
        <p className="text-gray-600 my-1">{owner}</p>
        <p className="font-bold color-primary-secondary">{price} Eth</p>
      </div>
    </div>
  );
};

export default NFT;
