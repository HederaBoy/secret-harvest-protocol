const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Secret Harvest Protocol...");

  // Get the contract factory
  const SecretHarvestProtocol = await ethers.getContractFactory("SecretHarvestProtocol");

  // Deploy the contract
  const feeRecipient = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual fee recipient
  const secretHarvest = await SecretHarvestProtocol.deploy(feeRecipient);

  await secretHarvest.waitForDeployment();

  const contractAddress = await secretHarvest.getAddress();
  console.log("Secret Harvest Protocol deployed to:", contractAddress);

  // Verify the deployment
  console.log("Contract deployed successfully!");
  console.log("Owner:", await secretHarvest.owner());
  console.log("Fee Recipient:", await secretHarvest.feeRecipient());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
