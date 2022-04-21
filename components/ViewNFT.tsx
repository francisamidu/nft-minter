import React from "react";
import { useAssets } from "../contexts";
import NFT from "./NFT";

const ViewNFT = () => {
  const { nft } = useAssets();
  const exists = nft ? Object.values(nft).every((val) => !!val) : false;
  return (
    <section className="flex flex-col justify-center items-center mt-5">
      {exists ? (
        <NFT {...nft} />
      ) : (
        <div className="flex flex-row items-center justify-center">
          <h2 className="text-center">No Assets to show</h2>
        </div>
      )}
    </section>
  );
};

export default ViewNFT;
