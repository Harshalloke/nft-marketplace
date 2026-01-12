require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

// Load environment variables
const fs = require('fs');
const privateKey = fs.existsSync('.secret')
    ? fs.readFileSync('.secret').toString().trim()
    : "0x0000000000000000000000000000000000000000000000000000000000000000";

module.exports = {
    networks: {
        hardhat: {
            chainId: 1337
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 1337
        },
        // Uncomment and configure for testnet deployment
        // sepolia: {
        //   url: process.env.SEPOLIA_RPC_URL || "",
        //   accounts: [privateKey],
        //   chainId: 11155111,
        // },
        // mumbai: {
        //   url: process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com",
        //   accounts: [privateKey],
        //   chainId: 80001,
        // }
    },
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    }
};
