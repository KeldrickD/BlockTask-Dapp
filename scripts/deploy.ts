import { ethers } from "hardhat";

async function main() {
  const BlockTask = await ethers.getContractFactory("BlockTask");
  const blockTask = await BlockTask.deploy();
  await blockTask.waitForDeployment();
  console.log("BlockTask deployed to:", await blockTask.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});