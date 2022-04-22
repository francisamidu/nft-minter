// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Strings.sol";

contract ERC1155NFT is ERC1155, ReentrancyGuard {
    using Strings for string;

    uint256 public _tokenId;    
    mapping(uint256 => string) public idToTokenUri;
    string baseURI;

    event TokenMinted(uint256 id);
    event BalanceWithdrawn(address indexed beneficiary,uint256 amount);

    struct Token {
        uint256 tokens;
        address owner;
        uint256 tokenId;
        uint256 createdAt;
    }

    mapping (uint256=>Token) public idToTokenItem;

    constructor(string memory _uri) ERC1155(_uri){
        setBaseMetadataURI(_uri);
    }

    function burnNFT(address _account, uint256 _id, uint256 _amount) public {
        require(msg.sender == _account);
        _burn(_account,_id,_amount);
    }


    function mintNFT(address account, uint256 amount, string memory tokenUri ,uint256 createdAt, bytes memory data) public {
        _tokenId++;        
        
        if(idToTokenItem[_tokenId].owner != address(0)){
            idToTokenItem[_tokenId].tokens += amount;             
        }else{
            idToTokenItem[_tokenId].tokens = amount;
            idToTokenItem[_tokenId].owner = msg.sender;
            idToTokenItem[_tokenId].tokenId = _tokenId;
            idToTokenItem[_tokenId].createdAt = createdAt;
        }      

        idToTokenUri[_tokenId] = tokenUri;

        _mint(account, _tokenId, amount, bytes(data));
        emit TokenMinted(_tokenId);
    }

    function fetchMyNFTs() public view returns (Token[] memory) {
        uint totalItemCount = _tokenId;

        Token[] memory items = new Token[](totalItemCount);

        for(uint i = 0; i <= totalItemCount; i++){
            if(idToTokenItem[i].owner == msg.sender){
                uint currentId = idToTokenItem[i].tokenId;
                Token storage currentItem = idToTokenItem[currentId];
                items[currentId] = currentItem;
            }
        }
        return items;
    }

    function transferNFT(uint256 tokenId, address _to, uint256 _amount) public {
        _safeTransferFrom(msg.sender,_to, tokenId, _amount, "0x0");
    }

    function transferOwnership(address _newOwner) public {
      uint256 totalItemCount = _tokenId;      
      
      for(uint i =0; i < totalItemCount; i++){
          if(idToTokenItem[i + 1].owner == msg.sender){
            uint currentId = idToTokenItem[i + 1].tokenId;
            idToTokenItem[currentId].owner = _newOwner;
            _safeTransferFrom(msg.sender,_newOwner, currentId, 1,"0x0");
          }
      }
    }

    function withdraw() public nonReentrant{
        uint256 balance = address(this).balance;
        require(balance > 0, "Not enough funds to withdraw");
        payable(msg.sender).transfer(balance);
        emit BalanceWithdrawn(msg.sender, balance);
    }

    /**
   * @dev Will update the base URL of token's URI
   * @param _newBaseMetadataURI New base URL of token's URI
   */
    function setBaseMetadataURI(
        string memory _newBaseMetadataURI
    ) public {
        baseURI = _newBaseMetadataURI;
    }
    
 function uri(
    uint256 _id
  ) public view override returns (string memory) {
    return Strings.strConcat(
      baseURI,
      idToTokenUri[_id]);
  }
}