const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC1155", () => {
  it("Should successfully mint ERC1155 token", async () => {
    const NFT = await ethers.getContractFactory("ERC1155NFT");
    const nft = await NFT.deploy("https://ipfs.infura.io/ipfs/");
    await nft.deployed();
    const [signer, { address: buyerAddress }] = await ethers.getSigners();
    const tx1 = await nft.mintNFT(
      signer.address,
      2,
      "hash1",
      Date.now(),
      "0x00"
    );
    const tx2 = await nft.mintNFT(
      signer.address,
      5,
      "hash2",
      Date.now(),
      "0x00"
    );
    await tx1.wait();
    await tx2.wait();
    let itemIds = await nft._tokenId();
    itemIds = itemIds.toString();
    const items = [];

    for (let id = 0; id <= itemIds; id++) {
      if (id) {
        let item = await nft.idToTokenItem(id);
        const tokenUri = await nft.uri(item.tokenId);
        const newItem = {
          tokenId: item.tokenId.toNumber(),
          owner: item.owner,
          createdAt: item.createdAt.toNumber(),
          tokenUri,
        };
        items.push(newItem);
      }
    }
    console.log(items);
  });
  it("Should successfully mint ERC721 token", async () => {
    const NFT = await ethers.getContractFactory("ERC721NFT");
    const nft = await NFT.deploy("Monster NFT", "MNFT");
    await nft.deployed();
    const [signer, { address: buyerAddress }] = await ethers.getSigners();
    const tx1 = await nft.mint(signer.address, "hash1", Date.now());
    const tx2 = await nft.mint(signer.address, "hash2", Date.now());
    await tx1.wait();
    await tx2.wait();
    let itemIds = await nft._tokenIds();
    itemIds = itemIds.toString();
    const items = [];

    for (let id = 0; id <= itemIds; id++) {
      if (id) {
        let item = await nft.idToTokenItem(id);
        const tokenUri = await nft.tokenURI(item._tokenId);
        const newItem = {
          tokenId: item._tokenId.toNumber(),
          owner: item._owner,
          createdAt: item._createdAt.toNumber(),
          tokenUri,
        };
        items.push(newItem);
      }
    }
    console.log(items);
  });
});
