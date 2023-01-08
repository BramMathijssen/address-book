const { assert } = require("chai");
const { network, deployments, ethers } = require("hardhat");

describe("EthGame Unit Tests", function () {
  let ethGame, deployer;
  beforeEach(async () => {
    accounts = await ethers.getSigners(); // could also do with getNamedAccounts
    deployer = accounts[0];
    await deployments.fixture("ethgame"); // Deploys modules with the tags “coinflip”
    ethGame = await ethers.getContract("EthGame"); // Returns a new connection to the CoinFlip Contract
  });

  describe("Constructor", () => {
    it("Initialised CoinFlip State to NONE (=2) when the contract is deployed", async () => {
      const playerCount = await ethGame.s_playerCounter();
      // prints 2 because enum values are converted to numbers in the way they are ordered. (NONE is the 3rd (=2nd index) in the enum)
      assert.equal(coinState, "0");
    });
  });
});
