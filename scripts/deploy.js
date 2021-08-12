const hre = require("hardhat");

async function main() {
  const Moonboi = await hre.ethers.getContractFactory("Moonboi");
  const moonboi = await Moonboi.deploy();

  await moonboi.deployed();

  console.log("Moonboi Contract deployed to:", moonboi.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
