import ERC1155ContractAbi from "./artifacts/contracts/ERC1155NFT.sol/ERC1155NFT.json";
import ERC721ContractAbi from "./artifacts/contracts/ERC721NFT.sol/ERC721NFT.json";

const ERC1155NFTAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ERC721NFTAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

const ERC1155Abi = ERC1155ContractAbi.abi;
const ERC721Abi = ERC721ContractAbi.abi;

export { ERC1155NFTAddress, ERC721NFTAddress, ERC1155Abi, ERC721Abi };
