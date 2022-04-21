import ERC1155ContractAbi from "./artifacts/contracts/ERC1155NFT.sol/ERC1155NFT.json";
import ERC721ContractAbi from "./artifacts/contracts/ERC721NFT.sol/ERC721NFT.json";

// const ERC1155NFTAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const ERC721NFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Production address
const ERC1155NFTAddress = "0x513E6122f7BAfE58b324A78E5486Af2313f91268";
const ERC721NFTAddress = "0x85c43E2F3d15fe4E8e5AC2bd25942D169E44F441";

const ERC1155Abi = ERC1155ContractAbi.abi;
const ERC721Abi = ERC721ContractAbi.abi;

export { ERC1155NFTAddress, ERC721NFTAddress, ERC1155Abi, ERC721Abi };
