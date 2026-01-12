const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();

    await nftMarketplace.deployed();

    console.log("NFTMarketplace deployed to:", nftMarketplace.address);

    // Save contract address and ABI for frontend
    const contractsDir = "./config";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/contract-address.json",
        JSON.stringify({ NFTMarketplace: nftMarketplace.address }, undefined, 2)
    );

    const NFTMarketplaceArtifact = await hre.artifacts.readArtifact("NFTMarketplace");

    fs.writeFileSync(
        contractsDir + "/NFTMarketplace.json",
        JSON.stringify(NFTMarketplaceArtifact, null, 2)
    );

    console.log("Contract address and ABI saved to /config");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
