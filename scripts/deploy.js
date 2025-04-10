// const hre = require("hardhat");

// async function main() {
//   const DegreeContract = await hre.ethers.getContractFactory("DegreeContract");
//   const degreeContract = await DegreeContract.deploy();
//   await degreeContract.deployed();
//   console.log("Contract deployed to:", degreeContract.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

//0x9E0AAC3bB7326aE2e4557433BB17493ceb32eE01 contract addrs

const hre = require("hardhat");

async function main() {
  const DegreeStorage = await hre.ethers.getContractFactory("DegreeContract");
  const degree = await DegreeStorage.deploy(); // This already deploys the contract in Ethers v6
  console.log(`contract deployed to: ${degree.target}`); // Use .target instead of .address in Ethers v6
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
