// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RoboPunkNFT is ERC721,Ownable{
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    //how many NFT can per wallet mint
    uint256 public maxPerWallet;
    bool isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address=>uint256) public walletMints;

    constructor() payable ERC721('RoboPunk','RP'){
        mintPrice=0.01 ether;
        totalSupply=0;
        maxSupply=1000;
        maxPerWallet=10;
    }
    function setPublicMintEnabled(bool isPublicMintEnabled_ ) external onlyOwner{
        isPublicMintEnabled=isPublicMintEnabled_;
    }
    function setBaseTokenUri(string calldata baseTokenUri_)external onlyOwner{
        baseTokenUri=baseTokenUri_;
    }
    function tokenURI(uint256 tokenId_)public view override returns(string memory){
        require(_exists(tokenId_),'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri,Strings.toString(tokenId_)));
    }
    function withdraw()external onlyOwner{
        (bool success,)=withdrawWallet.call{value:address(this).balance}('');
        require(success,'Failed to withdraw');
    }
    function mint(uint256 quantity_) public payable{
        require(isPublicMintEnabled,'Mint is not enabled');
        require(msg.value==quantity_*mintPrice,'Wrong mint value');
        require(totalSupply+quantity_<=maxSupply,'Sold out');
        require(walletMints[msg.sender]+quantity_<=maxPerWallet,'Exceed max wallet');
        for(uint256 i=0;i<quantity_;i++){
            uint newTokenId=totalSupply+1;
            totalSupply++;
            // 此行
            walletMints[msg.sender]++;
            // 
            _safeMint(msg.sender, newTokenId);
        }
    }
}

