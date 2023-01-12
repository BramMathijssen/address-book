import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddresses, abi } from "../constants";

const ConnectWallet = () => {
  const [connectButtonText, setConnectButtonText] = useState("Connect");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [chainId, setChainId] = useState(null);

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
    console.log(`----contract----`);
    console.log(contract);
    e.preventDefault();
    const tx = await contract.deposit({
      value: ethers.utils.parseEther("0.1"),
      gasLimit: 100000,
    });
  };

  contract
    ? contract.on("GameWon", (event) => {
        console.log(`game has been Won!`);
      })
    : null;

  return (
    <div>
      <button onClick={connectWalletHandler}>{connectButtonText}</button>
      <button onClick={depositHandler}>Deposit</button>
    </div>
  );
};

export default ConnectWallet;
