require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".privateKey").toString().trim() || "01234567890123456789";

const infuraId = fs.readFileSync(".infuraId").toString().trim() || "";

module.exports = {
  solidity: "0.8.11",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
      accounts: [`0x${privateKey}`],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      accounts: [`0x${privateKey}`],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraId}`,
      accounts: [`0x${privateKey}`],
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
