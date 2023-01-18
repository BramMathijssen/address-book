import { React, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { contractAddresses, abi } from "../constants";
import EthersContext from "../context/ethers-context";

import styles from "./ConnectWallet.module.scss";

const ConnectWallet = () => {
  const ethersCtx = useContext(EthersContext);

  return (
    <div className={styles.container}>
      {ethersCtx.userAddress ? (
        <button
          className={`${styles.button} ${styles.connected}`}
          onClick={() => ethersCtx.onConnect()}
        >
          Connected
        </button>
      ) : (
        <button
          className={`${styles.button} ${styles.unconnected}`}
          onClick={() => ethersCtx.onConnect()}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
