import React from "react";
import Image from "next/image";

import { Asset } from "../types";

const NFT = ({ title, description, image, id, price }: Partial<Asset>) => {
  return (
    <div className="py-2 text-center shadow">
      <h1 className="font-bold text-2xl capitalize color-dark-blue">
        {title} #{id}
      </h1>
      <Image
        src={image}
        layout="responsive"
        width="400"
        height="300"
        className="w-full rounded-md"
      />
      <p>Token Id: #{id}</p>
      <p>Selling For: {price} Eth</p>
      <p className="text-gray-600 italic">{description}</p>
    </div>
  );
};

export default NFT;
