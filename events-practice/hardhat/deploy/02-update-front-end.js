const { ethers } = require("hardhat");
const fs = require("fs");

const FRONT_END_ADDRESSES_FILE =
  "../addressbook-frontend/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "../addressbook-frontend/constants/abi.json";

module.exports = async function () {
  console.log(`updating front end...`);
  updateContractAddresses();
  updateAbi();
};

async function updateAbi() {
  console.log(`updating`);
  const addressBook = await ethers.getContract("AddressBook");
  console.log(`writing abi`);
  fs.writeFileSync(
    FRONT_END_ABI_FILE,
    addressBook.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const addressBook = await ethers.getContract("AddressBook");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8")
  );

  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(addressBook.address)) {
      currentAddresses[chainId].push(addressBook.address);
    }
  }
  {
    currentAddresses[chainId] = [addressBook.address];
  }
  console.log("writing contract address");
  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

module.exports.tags = ["all", "frontend"];
