import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CipherGrantLab contract...");

  // Deploy a mock ERC20 token for testing
  const MockToken = await ethers.getContractFactory("MockERC20");
  const mockToken = await MockToken.deploy("Cipher Token", "CIPHER", ethers.parseEther("1000000"));
  await mockToken.waitForDeployment();
  
  const tokenAddress = await mockToken.getAddress();
  console.log("MockERC20 deployed to:", tokenAddress);

  // Deploy the main contract
  const CipherGrantLab = await ethers.getContractFactory("CipherGrantLab");
  const cipherGrantLab = await CipherGrantLab.deploy(tokenAddress);
  await cipherGrantLab.waitForDeployment();

  const contractAddress = await cipherGrantLab.getAddress();
  console.log("CipherGrantLab deployed to:", contractAddress);

  // Verify deployment
  console.log("Verifying deployment...");
  const owner = await cipherGrantLab.owner();
  console.log("Contract owner:", owner);
  
  const tokenContract = await cipherGrantLab.token();
  console.log("Token contract address:", tokenContract);

  console.log("Deployment completed successfully!");
  console.log("Contract addresses:");
  console.log("- CipherGrantLab:", contractAddress);
  console.log("- MockERC20:", tokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
