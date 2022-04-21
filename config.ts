import ERC1155ContractAbi from "./artifacts/contracts/ERC1155NFT.sol/ERC1155NFT.json";
import ERC721ContractAbi from "./artifacts/contracts/ERC721NFT.sol/ERC721NFT.json";

const ERC1155NFTAddress = "0xf5045Fd0316B8E8E6d3824A5b8aF91573B8b6f57";
const ERC721NFTAddress = "0xbbf433B0ca3c241fb9964c9C6aD1A36a9473fef5";

const ERC1155Abi = ERC1155ContractAbi.abi;
const ERC721Abi = ERC721ContractAbi.abi;

export { ERC1155NFTAddress, ERC721NFTAddress, ERC1155Abi, ERC721Abi };
