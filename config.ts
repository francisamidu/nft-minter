import ERC1155ContractAbi from "./artifacts/contracts/ERC1155NFT.sol/ERC1155NFT.json";
import ERC721ContractAbi from "./artifacts/contracts/ERC721NFT.sol/ERC721NFT.json";

const ERC1155NFTAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ERC721NFTAddress = "0x30e3fB6DC335b68eC9D16EC930597db3136c1112";

const ERC1155Abi = ERC1155ContractAbi.abi;
const ERC721Abi = ERC721ContractAbi.abi;

export { ERC1155NFTAddress, ERC721NFTAddress, ERC1155Abi, ERC721Abi };
