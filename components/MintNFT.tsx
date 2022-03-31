import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { Button } from ".";
import Image from "next/image";
import { useApp, useContract } from "../contexts";
import { toast } from "react-toastify";
import { ipfs } from "../helpers";

const MintNFT = () => {
  const { account, connectWallet } = useApp();
  const { loadUserNFTs, ERC1155Contract, ERC721Contract } = useContract();
  const input = useRef(null);
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource>(null);
  const [nft, setNft] = useState<{
    name: string;
    description: string;
    type: "" | "ERC721" | "ERC1155";
    image: string;
  }>({
    name: "",
    description: "",
    type: "ERC1155",
    image: "",
  });
  const handleChange = (event: ChangeEvent<any>) => {
    setSelectedImage(event.target.files[0]);
  };
  const selectFiles = () => {
    input?.current?.click();
  };
  const resetFields = () => {
    setNft({
      name: "",
      description: "",
      type: "",
      image: "",
    });
    setSelectedImage(null);
  };
  const completeNftCreation = async () => {
    try {
      if (nft.type === "ERC721") {
        const image: any = selectedImage;
        const request = await ipfs.add(image);
        const url = `${request.path}`;
        setNft({
          ...nft,
          image: url,
        });
        const file: any = nft;
        const data = JSON.stringify(file);
        const response = await ipfs.add(data);
        const nftUrl = `${response.path}`;
        const transaction = await ERC721Contract.mint(
          account,
          nftUrl,
          Date.now()
        );
        const tx = await transaction.wait();
        console.log(tx);
      } else if (nft.type == "ERC1155") {
        const image: any = selectedImage;
        const request = await ipfs.add(image);
        const url = `${request.path}`;
        setNft({
          ...nft,
          image: url,
        });
        const file: any = nft;
        const data = JSON.stringify(file);
        const response = await ipfs.add(data);
        const transaction = await ERC1155Contract.mintNFT(
          account,
          5,
          Date.now()
        );
        const tx = await transaction.wait();
        console.log(tx);
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldnt complete action");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      toast.error("Image is required");
      return;
    }

    if (!nft.name) {
      toast.error("Please add a name");
    }

    if (!account) {
      connectWallet();
    } else {
      completeNftCreation();
    }
  };
  useEffect(() => {
    if (account && Object.values(nft).every((value) => !!value)) {
      completeNftCreation();
    }
  }, [account]);
  return (
    <div className="mt-4 py-3 sm:max-w-screen-lg sm:mx-auto px-4 sm:px-0">
      <h1 className="text-1xl font-bold mb-4 border-b-[1.5px] pb-4">
        Mint NFTS
      </h1>
      <div className="sm:grid mint-nft-layout grid-cols-2 flex flex-col">
        <div className="col-start-1 col-end-2 border-2 border-dashed flex flex-col items-center justify-center hover:bg-[#f3f3f3] transition-colors duration-300 relative sm:max-h-[400px] max-h-[200px]">
          <p className="flex flex-col items-center">
            <span
              className="text-blue-500 cursor-pointer font-bold ml-1"
              onClick={selectFiles}
            >
              Browse for File
            </span>
            <input
              hidden
              type="file"
              accept="image/*"
              ref={input}
              onChange={handleChange}
            />
          </p>
          {selectedImage && (
            <div
              className="absolute top-0 left-0 w-full hover:cursor-pointer z-10 hidden sm:block"
              onClick={() => setSelectedImage(null)}
            >
              <Image
                layout="intrinsic"
                width="510"
                height="400"
                src={URL.createObjectURL(selectedImage)}
              />
            </div>
          )}
        </div>
        <form
          className="col-start-2 col-end-3 sm:px-4 min-h-[400px] flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label htmlFor="name" className="font-bold mb-4">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 rounded-sm w-full py-2 px-2 border-[1.5px] border-gray-200 placeholder:text-sm outline-none text-[#999]"
              onChange={(e) =>
                setNft({
                  ...nft,
                  name: e.target.value,
                })
              }
              value={nft.name}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="font-bold mb-4">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="mt-2 rounded-sm w-full py-2 px-2 border-[1.5px] border-gray-200 placeholder:text-sm outline-none text-[#999]"
              onChange={(e) =>
                setNft({
                  ...nft,
                  description: e.target.value,
                })
              }
              value={nft.description}
            />
          </div>
          <div className="mb-6 switch">
            <span className="font-bold mb-8 cursor-none">Type</span>
            <input
              type="checkbox"
              id="switcher"
              className="mt-4 cursor-pointer"
              onChange={(e) => {
                const target = e.target;
                if (target.checked) {
                  setNft({
                    ...nft,
                    type: "ERC1155",
                  });
                } else {
                  setNft({
                    ...nft,
                    type: "ERC721",
                  });
                }
              }}
            />
            <label htmlFor="switcher"></label>
          </div>
          <div className="flex flex-row items-center mt-4 justify-self-end">
            <Button text="Mint NFT" type="submit" />
            <Button
              text="Cancel"
              className="hover:bg-white text-[#707070] ml-4 bg-[#eee]"
              onClick={resetFields}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MintNFT;
