require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "bscTestnet",
  networks: {
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s2.binance.org:8545/",
      accounts: [process.env.REACT_APP_CONTRACT_PRIVATE_KEY]
    }
  },
  solidity: "0.8.4",
};
