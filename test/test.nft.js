const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721", () => {
  it("Should successfully mint token", async () => {
    const NFT = await ethers.getContractFactory("ERC721NFT");
    const nft = await NFT.deploy();
    await nft.deployed();
    const nftAddress = nft.address;

    // console.log(`NFT address: ${nftAddress}`);

    const buyerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const [_, signer] = await ethers.getSigners();

    await nft.mintNFT(buyerAddress, "https://ipfs.infura.io/ipfs/mynft/");
    let tokenIds = await nft._tokenIds();
    tokenIds = tokenIds.toNumber();
    let items = [];

    for (let id = 0; id <= tokenIds; id++) {
      if (id) {
        const tokenUri = await nft.uri(id);
        let item = await nft.idToTokenItem(id);
        item = {
          amount: item.tokens.toNumber(),
          id: item.tokenId.toNumber(),
          owner: item.owner,
          tokenUri,
        };
        items.push(item);
      }
    }

    // await nft.transferNFT(1, signer.address, 10);
    // let tokenBalance = await nft.balanceOf(signer.address, 1);
    // tokenBalance = tokenBalance.toNumber();
    // console.log(tokenBalance);
  });
});
