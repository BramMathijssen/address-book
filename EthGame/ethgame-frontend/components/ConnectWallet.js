import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddresses, abi } from "../constants";
import EthersContext from "../context/ethers-context";

const ConnectWallet = () => {
  const [connectButtonText, setConnectButtonText] = useState("Connect");
  const [gameWon, setGameWon] = useState("");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [chainId, setChainId] = useState(null);

  const ethersCtx = useContext(EthersContext);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setConnectButtonText("Wallet Connected");
        await updateEthers();
        console.log(contractAddresses);
        console.log(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(`please install MetaMask`);
    }
  };

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempChainId = await tempProvider.getNetwork();
    setChainId(tempChainId);

    let tempContract = new ethers.Contract(
      contractAddresses[tempChainId.chainId][0], // gets the contract address on local hardhat network
      abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const depositHandler = async (e) => {
    if (gameWon !== "") {
      setGameWon("");
    }
    console.log(`----contract----`);
    console.log(contract);
    e.preventDefault();

    const gasPrice = await contract.estimateGas.deposit({
      value: ethers.utils.parseEther("0.1"),
    });
    const tx = await contract.deposit({
      value: ethers.utils.parseEther("0.1"),
      gasLimit: gasPrice,
    });
    console.log(`done`);
    const receipt = await tx.wait(1);
    console.log(`----receipt---`);
    console.log(receipt);
  };

  contract
    ? contract.on("GameWon", (winner, amountWon) => {
        const amountInEth = ethers.utils.formatEther(amountWon);
        setGameWon(
          `You Won the game! The winning address is: ${winner} , with and amountWon of ${amountInEth} ETH}`
        );
        console.log(`game has been Won!`);
      })
    : null;

  return (
    <div>
      <button onClick={connectWalletHandler}>{connectButtonText}</button>
      {contract && <button onClick={depositHandler}>Deposit</button>}
      {gameWon && gameWon}
    </div>
  );
};

export default ConnectWallet;
