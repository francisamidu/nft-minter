// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ERC721NFT is ERC721URIStorage, ReentrancyGuard  {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
  
    struct Token {
        uint256 _tokenId;
        address _owner;
        uint256 _createdAt;
    }

    event TokenMinted(uint256 id, uint256 timestamp);

    mapping (uint256=>Token) public idToTokenItem;

    constructor(
    string memory _tokenName,
    string memory _tokenSymbol
  ) ERC721 (_tokenName, _tokenSymbol) {}

    function _baseURI() internal pure override returns (string memory baseURI) {
        return "http://ipfs.fleek.co/ipfs/";
    }   

    function mint(address to, string memory _tokenURI, uint256 createdAt) public {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        idToTokenItem[tokenId]._tokenId = tokenId;
        idToTokenItem[tokenId]._owner = to;
        idToTokenItem[tokenId]._createdAt = createdAt;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        emit TokenMinted(tokenId, idToTokenItem[tokenId]._createdAt);
    }

    function transferNFT(address to, uint256 tokenId) public {
        require(idToTokenItem[tokenId]._owner == msg.sender,"You have to own the token to transfer it");
        _transfer(msg.sender,to,tokenId);
    }

    function transferOwnership(address _newOwner) public {
      uint256 totalItemCount = _tokenIds.current();
      
      for(uint i =0; i < totalItemCount; i++){
          if(idToTokenItem[i + 1]._owner == msg.sender){
            uint currentId = idToTokenItem[i + 1]._tokenId;
            idToTokenItem[currentId]._owner = _newOwner;
            _transfer(msg.sender,_newOwner,currentId);
          }
      }
    }

    function _beforeTokenTransfer(address from, address to, uint256 _tokenId) 
    internal override(ERC721){
        super._beforeTokenTransfer(from, to, _tokenId);
    } 

    // function setCost(uint256 _cost) public {
    //     cost = _cost;
    // }
    

  // function withdraw() public nonReentrant {
  //   (bool os, ) = payable(owner()).call{value: address(this).balance}('');
  //   require(os);    
  // }
}
