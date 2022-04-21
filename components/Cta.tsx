import React from "react";
import { Button } from ".";
import router from "next/router";

const Cta = () => {
  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <section className="py-12 px-8 bg-white dark:bg-gray-800 dark:text-gray-100">
      <div className="md:max-w-screen-lg m-auto flex flex-col  items-center justify-center">
        <h1 className="color-teal text-2xl font-bold text-center">
          Wanna be among the happy NFT owners?
        </h1>
        <h2 className="text-1xl font-semibold mt-5">
          Get started by joining the leading NFT crowd!
        </h2>
        <Button
          text="Start minting!!!"
          className="mt-4"
          onClick={handleClick}
        />
      </div>
    </section>
  );
};

export default Cta;
