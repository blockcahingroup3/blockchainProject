require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/tCB_7_z_ZE8hFGAGz4NxJizNdrw-pxPg",
      accounts: [`45b9b06f38ff18ac27d5af5ccbbb19c3c91ad965128c2eab9c633a994cf07eff`],},
    },
  };
