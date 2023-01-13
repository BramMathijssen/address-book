import React, { useState } from "react";
import { ethers } from "ethers";
import { contractAddresses, abi } from "../constants";

const EthersContext = React.createContext({
  provider: null,
  signer: null,
  contract: null,
  onConnect: () => {},
});

export const EthersContextProvider = (props) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [chainId, setChainId] = useState(null);

  const conn = () => {
    console.log(`hey test conn`);
  };

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
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

  return (
    <EthersContext.Provider
      value={{
        provider: provider,
        signer: signer,
        contract: contract,
        onConnect: connectWalletHandler,
      }}
    >
      {props.children}
    </EthersContext.Provider>
  );
};

export default EthersContext;
