// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CreativeCoding is ERC721, Ownable, ReentrancyGuard, PaymentSplitter {
    using Strings for uint256;
    using Counters for Counters.Counter;

    bytes32 public root;

    address proxyRegistryAddress;

    uint256 public maxSupply = 10;

    string public baseURI;
    string public notRevealedUri =
        "ipfs://QmcKLvrR5vRNgxTPj93HG6rn5yD2uTDCa3ZpupxxCyLimQ/hidden.json";
    string public baseExtension = ".json";

    bool public paused = false;
    bool public revealed = false;
    bool public presaleM = false;
    bool public publicM = false;

    uint256 presaleAmountLimit = 3;
    mapping(address => uint256) public _presaleClaimed;

    uint256 _price = 10000000000000000; // 0.01 ETH

    Counters.Counter private _tokenIds;

    uint256[] private _teamShares = [100]; 
    address[] private _team = [0x1899a1DaDA493f5B0Ed642e537bDB03685a03d6C];

    constructor(
        string memory uri,
        bytes32 merkleroot,
        address _proxyRegistryAddress
    )
        ERC721("CreativeCoding", "CRC")
        PaymentSplitter(_team, _teamShares) 
        ReentrancyGuard() 
    {
        root = merkleroot;
        proxyRegistryAddress = _proxyRegistryAddress;

        setBaseURI(uri);
    }

    function setBaseURI(string memory _tokenBaseURI) public onlyOwner {
        baseURI = _tokenBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function reveal() public onlyOwner {
        revealed = true;
    }

    function setMerkleRoot(bytes32 merkleroot) public onlyOwner {
        root = merkleroot;
    }

    modifier onlyAccounts() {
        require(msg.sender == tx.origin, "Not allowed origin");
        _;
    }

    modifier isValidMerkleProof(bytes32[] calldata _proof) {
        require(
            MerkleProof.verify(
                _proof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ) == true,
            "Not allowed origin"
        );
        _;
    }

    function togglePause() public onlyOwner {
        paused = !paused;
    }

    function togglePresale() public onlyOwner {
        presaleM = !presaleM;
    }

    function togglePublicSale() public onlyOwner {
        publicM = !publicM;
    }

    function presaleMint(
        address account,
        uint256 _amount,
        bytes32[] calldata _proof
    ) external payable isValidMerkleProof(_proof) onlyAccounts {
        require(msg.sender == account, "CreativeCoding: Not allowed");
        require(presaleM, "CreativeCoding: Presale is OFF");
        require(!paused, "CreativeCoding: Contract is paused");
        require(
            _amount <= presaleAmountLimit,
            "CreativeCoding: You can't mint so much tokens"
        );
        require(
            _presaleClaimed[msg.sender] + _amount <= presaleAmountLimit,
            "CreativeCoding: You can't mint so much tokens"
        );

        uint256 current = _tokenIds.current();

        require(
            current + _amount <= maxSupply,
            "CreativeCoding: max supply exceeded"
        );
        require(
            _price * _amount <= msg.value,
            "CreativeCoding: Not enough ethers sent"
        );

        _presaleClaimed[msg.sender] += _amount;

        for (uint256 i = 0; i < _amount; i++) {
            mintInternal();
        }
    }

    function publicSaleMint(uint256 _amount) external payable onlyAccounts {
        require(publicM, "CreativeCoding: PublicSale is OFF");
        require(!paused, "CreativeCoding: Contract is paused");
        require(_amount > 0, "CreativeCoding: zero amount");

        uint256 current = _tokenIds.current();

        require(
            current + _amount <= maxSupply,
            "CreativeCoding: Max supply exceeded"
        );
        require(
            _price * _amount <= msg.value,
            "CreativeCoding: Not enough ethers sent"
        );

        for (uint256 i = 0; i < _amount; i++) {
            mintInternal();
        }
    }

    function mintInternal() internal nonReentrant {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();

        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }
}

/**
  @title An OpenSea delegate proxy contract which we include for whitelisting.
  @author OpenSea
*/
contract OwnableDelegateProxy {

}

/**
  @title An OpenSea proxy registry contract which we include for whitelisting.
  @author OpenSea
*/
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}
