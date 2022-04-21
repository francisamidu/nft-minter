const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC1155", () => {
  it("Should successfully mint token", async () => {
    const NFT = await ethers.getContractFactory("ERC1155NFT");
    const nft = await NFT.deploy("https://ipfs.infura.io/ipfs/");
    await nft.deployed();
    const [signer, { address: buyerAddress }] = await ethers.getSigners();
    const tx1 = await nft.mintNFT(signer.address, 2, Date.now(), "0x00");
    const tx2 = await nft.mintNFT(signer.address, 5, Date.now(), "0x00");
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
});
