import path from "path";
import { ethers, artifacts } from "hardhat";
import { Contract } from "ethers";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const Zinx = await ethers.getContractFactory("Zinx");
  const zinx = await Zinx.deploy();

  await zinx.deployed();

  console.log("Zinx deployed to:", zinx.address);
  // save front-end files
  saveFrontendFiles(zinx);
}

function saveFrontendFiles(zinx: Contract) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Zinx: zinx.address }, undefined, 2)
  );

  const ZinxArtifact = artifacts.readArtifactSync("Zinx");

  fs.writeFileSync(
    contractsDir + "/Zinx.json",
    JSON.stringify(ZinxArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
