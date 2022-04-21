async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ERC1155NFT = await ethers.getContractFactory("ERC1155NFT");
  const erc1155Nft = await ERC1155NFT.deploy("https://ipfs.infura.io/");
  await erc1155Nft.deployed();
  console.log(`ER1155NFT address: ${erc1155Nft.address}`);

  const ERC721NFT = await ethers.getContractFactory("ERC721NFT");
  const erc721Nft = await ERC721NFT.deploy(
    "Monster NFT",
    "MNFT",
    ethers.utils.parseEther("0.5"),
    10
  );
  await erc721Nft.deployed();
  console.log(`ERC721NFT address: ${erc721Nft.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
