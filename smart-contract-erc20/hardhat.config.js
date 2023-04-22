require("dotenv").config();

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

module.exports = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    palm: {
      url: `https://palm-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    avalanche: {
      url: `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    nft: {
      url: `https://nft.api.infura.io/`,
    },
    near: {
      url: `https://near-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    aurora: {
      url: `https://aurora-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    starknet: {
      url: `https://starknet-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    celo: {
      url: `https://celo-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "ETH",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
