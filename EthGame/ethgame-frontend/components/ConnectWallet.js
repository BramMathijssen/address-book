import { React, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { contractAddresses, abi } from "../constants";
import EthersContext from "../context/ethers-context";

const ConnectWallet = () => {

  const ethersCtx = useContext(EthersContext);

  return (
    <div>
      {ethersCtx.userAddress ? (
        <button className="connect-button connected" onClick={() => ethersCtx.onConnect()}>Connected</button>
      ) : (
        <button className="connect-button unconnected" onClick={() => ethersCtx.onConnect()}>Connect</button>
      )}
    </div>
  );
};

export default ConnectWallet;
