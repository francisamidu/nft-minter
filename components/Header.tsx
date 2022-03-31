import React from "react";
import Image from "next/image";
import { useApp } from "../contexts";
import Button from "./Button";
import router from "next/router";

const Header = () => {
  const { name } = useApp();
  const handleClick = () => {
    router.push("/dashboard?tag=mint_an_nft");
  };
  return (
    <section className="bg-white min-h-screen py-3">
      <div className="md:max-w-screen-xl md:mx-auto flex flex-col sm:flex-row md:justify-center items-center pt-6 sm:mt-36 mt-20 h-full">
        <div className="relative flex flex-row justify-center mr-4">
          <Image
            src="/3081783.jpg"
            layout="intrinsic"
            width="300"
            height="300"
            className="w-full rounded-full"
          />
        </div>
        <div className="flex flex-col items-center text-center">
          <h1 className="sm:text-5xl text-3xl leading-relaxed font-bold ">
            Join the leading non-fungible token (NFT) crowd
          </h1>
          <h2 className="text-1xl mt-8 w-3/5 text-center mx-auto">
            It starts by minting your own NFTs right in your browser. Get beyond
            the curve!!
          </h2>
          <Button text="Get Started" right={true} onClick={handleClick} />
        </div>
        <div className="relative hidden sm:flex flex-row justify-center px-6 ml-4">
          <Image
            src="/5409458.jpg"
            layout="intrinsic"
            width="300"
            height="300"
            className="w-full rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
