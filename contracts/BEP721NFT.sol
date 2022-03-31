// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BEP721NFT is ERC721, Ownable  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event TokenMinted(uint256 id);

    constructor() ERC721("My NFT","MNFT"){}

    function _baseURI() internal pure override returns (string memory baseURI) {
        return "https://ipfs.infura.io/";
    }   

    function safeMint(address to) public onlyOwner {
        _tokenIds.increment();
        _safeMint(to, _tokenIds.current());
        emit TokenMinted(_tokenIds.current());
    }

    function _beforeTokenTransfer(address from, address to, uint256 _tokenId) 
    internal override(ERC721){
        super._beforeTokenTransfer(from, to, _tokenId);
    } 

    // function supportsInterface(bytes4 _interfaceId) public view override(ER721) returns(bool support) {
    //     return super._supportsInterface(_interfaceId);
    // }
}
