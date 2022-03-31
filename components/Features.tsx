import React from "react";
import { uid } from "../helpers";

import {
  IoLockClosed as ISecurity,
  IoImage as IImage,
  IoWallet as IWallet,
} from "react-icons/io5";

const features = [
  {
    id: uid(),
    title: "Secure",
    icon: <ISecurity className="text-3xl text-white" />,
  },
  {
    id: uid(),
    title: "Easy to Use",
    icon: <IImage className="text-3xl text-white" />,
  },
  {
    id: uid(),
    title: "Multiple Wallets",
    icon: <IWallet className="text-3xl text-white" />,
  },
];
const Features = () => {
  return (
    <section className="md:max-w-screen-lg md:mx-auto bg-[#1B2041] py-8 px-5 flex sm:flex-row flex-col items-center -mt-11 rounded-md">
      <div className="text-white w-full sm:w-1/3 px-3 text-center mt-4 sm:mt-0">
        <h1 className="font-bold mb-4 text-2xl">Features</h1>
        <p className="w-4/5 mx-auto sm:mx-0 sm:w-full">
          This nft minter is designed to be fast, simple yet feature rich
        </p>
      </div>
      <div className="flex flex-row sm:flex-row justify-center items-center w-full sm:w-2/3">
        {features.map((f) => (
          <div
            key={f.id}
            className="p-8 sm:max-w-[320px] flex flex-col flex-1 justify-center items-center hover:bg-[#1a2257] transition-all duration-200 rounded-md"
          >
            <div>{f.icon}</div>
            <h3 className="font-bold my-2 text-[1rem] text-white text-center">
              {f.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
