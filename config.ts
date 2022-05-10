import ERC1155ContractAbi from "./artifacts/contracts/ERC1155NFT.sol/ERC1155NFT.json";
import ERC721ContractAbi from "./artifacts/contracts/ERC721NFT.sol/ERC721NFT.json";

// Dev Addresses
// const ERC1155NFTAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const ERC721NFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Production addresses
const ERC1155NFTAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const ERC721NFTAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

const ERC1155Abi = ERC1155ContractAbi.abi;
const ERC721Abi = ERC721ContractAbi.abi;

export { ERC1155NFTAddress, ERC721NFTAddress, ERC1155Abi, ERC721Abi };
