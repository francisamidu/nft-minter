// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BEP1155NFT is ERC1155,Ownable {
    uint256 public _tokenId;    

    event TokenMinted(uint256 id);
    event BalanceWithdrawn(address indexed beneficiary,uint256 amount);

    struct Token {
        uint256 tokens;
        address owner;
        uint256 tokenId;
    }

    mapping (uint256=>Token) public idToTokenItem;

    constructor(string memory _uri) ERC1155(_uri){}

    function burnNFT(address _account, uint256 _id, uint256 _amount) public {
        require(msg.sender == _account);
        _burn(_account,_id,_amount);
    }

    function setURI(string memory _newURI)public onlyOwner {
        _setURI(_newURI);
    } 

    function mintNFT(address account, uint256 amount, bytes memory data) public onlyOwner {
        _tokenId++;        
        
        if(idToTokenItem[_tokenId].owner != address(0)){
            idToTokenItem[_tokenId].tokens += amount;             
        }else{
            idToTokenItem[_tokenId].tokens = amount;
            idToTokenItem[_tokenId].owner = msg.sender;
            idToTokenItem[_tokenId].tokenId = _tokenId;
            
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

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Not enough funds to withdraw");
        payable(msg.sender).transfer(balance);
        emit BalanceWithdrawn(msg.sender, balance);
    }

    function uri(uint256 tokenId) override public view returns (string memory tokeId) {
        return string(
            abi.encodePacked(
               super.uri(tokenId),
               Strings.toString(tokenId),
               ".json" 
            )
        );
    }
}