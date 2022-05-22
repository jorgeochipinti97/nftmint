const CreativeCoding = artifacts.require("CreativeCoding");
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const WhiteList  = require('../utils/whiteList/WhiteList')


const BASE_URI = 'ipfs://QmPQc74BmmyixmKn9nFf4Hx7x487XhZC2vCH7uUmSzTTPk/'
const proxyRegistryAddressRinkeby = '0xf57b2c51ded3a29e6891aba85459d600256cf317'

const leafNodes = WhiteList.map((addr) => keccak256(addr))
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
const root = merkleTree.getRoot()



module.exports = function (deployer) {
  deployer.deploy(CreativeCoding, BASE_URI, root, proxyRegistryAddressRinkeby);
};