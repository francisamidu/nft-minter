import React from "react";
import { useApp } from "../contexts";

const AboutUs = () => {
  const { name } = useApp();
  return (
    <section className="py-14 bg-[#1b2041] mt-1 dark:bg-gray-800 dark:text-gray-100">
      <div className="md:max-w-screen-lg md:m-auto text-center">
        <div className="flex flex-col ml-4 p-4">
          <h1 className="text-white font-bold text-3xl mb-4 ">About {name}</h1>
          <p className="text-[#eee] w-3/5 mx-auto">
            Ever since non-fungible tokens (NFT)s came into recognition they
            took the digital world by storm. Dominating crypto games and art
            pieces, NFTs have become a digital trend to reckon with. Join the
            hype and mint(create) your own digital assets with {name}.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
