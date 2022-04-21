const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721", () => {
  it("Should successfully mint token", async () => {
    const NFT = await ethers.getContractFactory("ERC721NFT");
    const nft = await NFT.deploy(
      "Monster NFT",
      "MNFT",
      ethers.utils.parseEther("0.5"),
      "10",
      "ipfs.io"
    );
    await nft.deployed();
    const [_, { address: buyerAddress }] = await ethers.getSigners();
    const tx1 = await nft.mint(
      buyerAddress,
      "ipfs.infura.io/1.jpg",
      Date.now()
    );
    const tx2 = await nft.mint(
      buyerAddress,
      "ipfs.infura.io/2.jpg",
      Date.now()
    );
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
