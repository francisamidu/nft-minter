import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from ".";
import Image from "next/image";
import { useAssets, useWallet } from "../contexts";
import { toast } from "react-toastify";
import { ipfs } from "../helpers";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Modal from "web3modal";
import { ethers } from "ethers";
import {
  ERC1155Abi,
  ERC1155NFTAddress,
  ERC721Abi,
  ERC721NFTAddress
} from "../config";

const MintNFT = () => {
  const { account, active } = useWallet();
  const { setNft: setAsset } = useAssets();
  const input = useRef(null);
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource>(null);
  const [nft, setNft] = useState<{
    amount?: number;
    name: string;
    description: string;
    type: "" | "ERC721" | "ERC1155";
    image: string;
  }>({
    amount: 1,
    name: "",
    description: "",
    type: "ERC721",
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
      amount: 1,
      name: "",
      description: "",
      type: "",
      image: "",
    });
    setSelectedImage(null);
  };
  const completeNftCreation = async () => {
    if (!account && !active) {
      toast.error("Connect your wallet and try again");
      return;
    }
    try {
      //Connect to wallet
      const modal = new Modal();
      const connection = await modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const ERC721Contract = new ethers.Contract(
        ERC721NFTAddress,
        ERC721Abi,
        signer
      );

      const ERC1155Contract = new ethers.Contract(
        ERC1155NFTAddress,
        ERC1155Abi,
        signer
      );

      if (nft.type === "ERC721") {
        const image: any = selectedImage;
        const request = await ipfs.add(image);
        const url = `http://gateway.ipfs.io/ipfs/${request.path}`;
        const data: any = JSON.stringify({
          name: nft.name,
          description: nft.description,
          image: url,
        });
        const response = await ipfs.add(data);
        const transaction = await ERC721Contract.mint(
          account,
          response.path,
          Date.now()
        );
        const tx = await transaction.wait();
        toast.success("NFT Minted. View it under 'View NFT' tab");
        const tokenId = tx.events[1].args[0].toString();

        const tokenUri = await ERC721Contract.tokenURI(tokenId);
        const meta = await (await fetch(tokenUri)).json();
        let item = await ERC721Contract.idToTokenItem(tokenId);
        item = {
          id: Number(item._tokenId.toString()),
          owner: item._owner,
          image: meta.image,
          createdAt: new Date(Number(item._createdAt.toString())),
        };
        setAsset(item);
        setNft({
          ...nft,
          description: "",
          amount: 0,
          image: "",
          name: "",
          type: "ERC721",
        });
      } else if (nft.type == "ERC1155") {
        const image: any = selectedImage;
        const request = await ipfs.add(image);
        const data = JSON.stringify({
          ...nft,
          image: `http://gateway.ipfs.io/ipfs/${request.path}`,
        });
        const nftUrl = await ipfs.add(data);
        const transaction = await ERC1155Contract.mintNFT(
          account,
          nft.amount,
          nftUrl.path,
          Date.now(),
          "0x00"
        );
        const tx = await transaction.wait();

        if (nft.amount > 1) {
          toast.success("NFT(s) Minted");
        } else {
          const tokenId = tx.events[1].args[0].toString();
          const tokenUri = await ERC721Contract.uri(tokenId);
          const meta = await (await fetch(tokenUri)).json();
          let item = await ERC721Contract.idToTokenItem(tokenId);
          item = {
            id: Number(item._tokenId.toString()),
            owner: item._owner,
            image: meta.image,
            createdAt: new Date(Number(item._createdAt.toString())),
          };
          setAsset(item);
          toast.success("NFT(s) Minted. View it under 'View NFT' tab");
        }

        setNft({
          ...nft,
          description: "",
          amount: 0,
          image: "",
          name: "",
          type: "ERC721",
        });
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
      toast.error("Please connect to your wallet first");
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
          {nft.type === "ERC1155" && (
            <div className="flex flex-col my-6">
              <label htmlFor="amount" className="font-bold mb-4">
                Amount
              </label>
              <div className="flex flex-row items-center">
                <AiOutlineMinus
                  className={
                    nft.amount > 0
                      ? "cursor-pointer text-black"
                      : "cursor-pointer text-gray-400"
                  }
                  onClick={() => {
                    if (nft.amount > 1) {
                      setNft({
                        ...nft,
                        amount: --nft.amount,
                      });
                    }
                  }}
                />
                <span className="font-bold mx-4">{nft.amount}</span>
                <AiOutlinePlus
                  className="cursor-pointer text-black"
                  onClick={() =>
                    setNft({
                      ...nft,
                      amount: ++nft.amount,
                    })
                  }
                />
              </div>
            </div>
          )}
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
