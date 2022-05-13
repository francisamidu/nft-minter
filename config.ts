import ERC1155ContractAbi from "./artifacts/contracts/ERC1155NFT.sol/ERC1155NFT.json";
import ERC721ContractAbi from "./artifacts/contracts/ERC721NFT.sol/ERC721NFT.json";

// Dev Addresses
// const ERC1155NFTAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const ERC721NFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Production addresses
const ERC1155NFTAddress = "0xDC87cBB881197bd87a176AaB14e2d24c5Bb2A8C5";
const ERC721NFTAddress = "0x4F735E2f27BfD1d7adEe3868ea3f5126e382d233";

const ERC1155Abi = ERC1155ContractAbi.abi;
const ERC721Abi = ERC721ContractAbi.abi;

export { ERC1155NFTAddress, ERC721NFTAddress, ERC1155Abi, ERC721Abi };
