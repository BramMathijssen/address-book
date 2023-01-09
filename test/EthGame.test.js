const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");

describe("EthGame Unit Tests", function () {
  let ethGame, deployer, accounts;
  const sendValue = ethers.utils.parseEther("0.1");
  beforeEach(async () => {
    accounts = await ethers.getSigners(); // could also do with getNamedAccounts
    deployer = accounts[0];
    await deployments.fixture("ethgame"); // Deploys modules with the tags “ethgame”
    ethGame = await ethers.getContract("EthGame"); // Returns a new connection to the EthGame Contract
  });

  describe("Contract initialisation", () => {
    it("Initialised the contract with an playercount of 0s", async () => {
      const playerCount = await ethGame.s_playerCounter();
      // prints 2 because enum values are converted to numbers in the way they are ordered. (NONE is the 3rd (=2nd index) in the enum)
      assert.equal(playerCount, "0");
    });
  });
  describe("deposit function", () => {
    it("Transaction reverts if not enough ETH is sent with transaction", async () => {
      await expect(ethGame.deposit()).to.be.reverted;
    });
    it("Increases playerCounter by one after sending 0.1ETH to the deposit function", async () => {
      await ethGame.deposit({ value: sendValue });

      const playerCountAfter = await ethGame.s_playerCounter();
      assert.equal(playerCountAfter, "1");
    });
    it("Increases playerCounter to 10 after doing 10 deposit calls", async () => {
      const playerCountStart = await ethGame.s_playerCounter();
      console.log(`player counter at start is ${playerCountStart}`);
      for (let i = 0; i < 10; i++) {
        await ethGame.deposit({ value: sendValue });
      }

      const playerCountAfter = await ethGame.s_playerCounter();
      console.log(`player counter at end is ${playerCountAfter}`);
      assert.equal(playerCountAfter, "10");
    });
    it("Resets the playerCount to 0 after the playercount reached 14", async () => {
      const playerCountStart = await ethGame.s_playerCounter();
      console.log(`player counter at start is ${playerCountStart}`);
      for (let i = 0; i < 15; i++) {
        await ethGame.deposit({ value: sendValue });
      }

      const playerCountAfter = await ethGame.s_playerCounter();
      console.log(`player counter at end is ${playerCountAfter}`);
      assert.equal(playerCountAfter, "0");
    });
  });
  describe("(Redundant Test) Testing Transfering Funds Between Accounts", () => {
    let balance;
    beforeEach(async () => {
      accounts = await ethers.getSigners(); // could also do with getNamedAccounts
      userConnectedContract = await ethGame.connect(accounts[1]);
      userAccount = accounts[1];
    });
    it.only("Testing of Transfers", async () => {
      console.log(`the balance of this address is ${userAccount.address}`);
      balance = (
        await ethGame.provider.getBalance(userAccount.address)
      ).toString();
      console.log(ethers.utils.formatEther(balance), "ETH");

      let tx = {
        to: accounts[2].address,
        value: ethers.utils.parseEther("0.1"),
      };

      await accounts[1].sendTransaction(tx);

      balance = (
        await ethGame.provider.getBalance(userAccount.address)
      ).toString();
      console.log(ethers.utils.formatEther(balance), "ETH");
    });
  });
  describe("Winning Functions", () => {
    let userConnectedContract, userAccount;
    beforeEach(async () => {
      accounts = await ethers.getSigners(); // could also do with getNamedAccounts
      userConnectedContract = await ethGame.connect(accounts[1]);
      userAccount = accounts[1];
      for (let i = 0; i < 15; i++) {
        await ethGame.deposit({ value: sendValue });
      }
    });
    it("Testing the winning function", async () => {});
  });
});
