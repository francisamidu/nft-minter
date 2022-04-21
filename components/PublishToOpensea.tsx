import React from "react";

const PublishToOpensea = () => {
  return (
    <div className="flex flex-col">
      <p className="sm:max-w-screen-md sm:mx-auto mt-5">
        OpenSea will automatically pick up transfers on your contract. You can
        visit an asset by going to
        https://opensea.io/assets/CONTRACT_ADDRESS/TOKEN_ID.
      </p>
      <p className="sm:max-w-screen-md sm:mx-auto mt-4">
        To load all your metadata on your items at once, visit{" "}
        <a href="https://opensea.io/get-listed" className="text-blue-500">
          opensea listing
        </a>{" "}
        and enter your address to load the metadata into OpenSea! You can even
        do this for the Rinkeby test network if you deployed there, by going to{" "}
        <a
          href="https://rinkeby.opensea.io/get-listed"
          className="text-blue-500"
        >
          Rinkeby listing
        </a>
        .
      </p>
    </div>
  );
};

export default PublishToOpensea;
