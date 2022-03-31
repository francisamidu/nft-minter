async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ERC1155NFT = await ethers.getContractFactory("ERC1155NFT");
  const erc1155Nft = await ERC1155NFT.deploy("ipfs://f0{id}");
  await erc1155Nft.deployed();
  console.log(`ER1155NFT address: ${erc1155Nft.address}`);

  const ERC721NFT = await ethers.getContractFactory("ERC721NFT");
  const erc721Nft = await ERC721NFT.deploy();
  await erc721Nft.deployed();
  console.log(`ERC721NFT address: ${erc721Nft.address}`);

  // const BEP1155NFT = await ethers.getContractFactory("BEP1155NFT");
  // const bep1155Nft = await BEP1155NFT.deploy(
  //   "https://ipfs.infura.io/ipfs/mynft"
  // );
  // await bep1155Nft.deployed();
  // console.log(`BEP1155NFT address: ${bep1155Nft.address}`);

  // const BEP721NFT = await ethers.getContractFactory("BEP721NFT");
  // const bep721Nft = await BEP721NFT.deploy("https://ipfs.infura.io/ipfs/mynft");
  // await bep721Nft.deployed();
  // console.log(`BEP721NFT address: ${bep721Nft.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
