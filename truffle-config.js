const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonicPhrase = ""

module.exports = {

  networks: {
     rinkeby: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase
          },
          providerOrUrl: "https://rinkeby.infura.io/v3/c513f666478f4d6bb48bc1638b67a040"

        }),
      network_id: 4,
    },
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.9",     
    }
  },
  plugins: ['truffle-plugin-verify'],
  api_keys:{
    etherscan:'4FJUKURA2P7WCER8CVN596XUVK4JS1ICJ9'
  }

};
