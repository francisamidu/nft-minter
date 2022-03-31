// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ERC1155NFT is ERC1155,Ownable {
    uint256 public _tokenId;    

    event TokenMinted(uint256 id);
    event BalanceWithdrawn(address indexed beneficiary,uint256 amount);

    struct Token {
        uint256 tokens;
        address owner;
        uint256 tokenId;
        uint256 createdAt;
    }

    mapping (uint256=>Token) public idToTokenItem;
    mapping (uint256 => string) private _tokenURIs;

    constructor(string memory _uri) ERC1155(_uri){}

    function burnNFT(address _account, uint256 _id, uint256 _amount) public {
        require(msg.sender == _account);
        _burn(_account,_id,_amount);
    }


    function mintNFT(address account, uint256 amount, uint256 createdAt, bytes memory data) public onlyOwner {
        _tokenId++;        
        
        if(idToTokenItem[_tokenId].owner != address(0)){
            idToTokenItem[_tokenId].tokens += amount;             
        }else{
            idToTokenItem[_tokenId].tokens = amount;
            idToTokenItem[_tokenId].owner = msg.sender;
            idToTokenItem[_tokenId].tokenId = _tokenId;
            idToTokenItem[_tokenId].createdAt = createdAt;
        }      

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

    function transferNFT(uint256 tokenId, address _to, uint256 _amount) public onlyOwner {
        _safeTransferFrom(msg.sender,_to, tokenId, _amount, "0x0");
    }

    function transferOwnership(address _newOwner) public onlyOwner override {
      uint256 totalItemCount = _tokenId;      
      
      for(uint i =0; i < totalItemCount; i++){
          if(idToTokenItem[i + 1].owner == msg.sender){
            uint currentId = idToTokenItem[i + 1].tokenId;
            idToTokenItem[currentId].owner = _newOwner;
            _safeTransferFrom(msg.sender,_newOwner, currentId, 1,"0x0");
          }
      }
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Not enough funds to withdraw");
        payable(msg.sender).transfer(balance);
        emit BalanceWithdrawn(msg.sender, balance);
    }

    function uint2hexstr(uint256 i) public pure returns (string memory) {
        if (i == 0) return "0";
        uint j = i;
        uint length;
        while (j != 0) {
            length++;
            j = j >> 4;
        }
        uint mask = 15;
        bytes memory bstr = new bytes(length);
        uint k = length;
        while (i != 0) {
            uint curr = (i & mask);
            bstr[--k] = curr > 9 ?
                bytes1(uint8(55 + curr)) :
                bytes1(uint8(48 + curr)); // 55 = 65 - 10
            i = i >> 4;
        }
        return string(bstr);
    }
    
    function uri(uint256 _tokenID) override public pure returns (string memory) {
    
       string memory hexstringtokenID;
       hexstringtokenID = uint2hexstr(_tokenID);
    
        return string(
            abi.encodePacked(
            "ipfs://f0",
            hexstringtokenID)
            );
        }
}