import { React, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { contractAddresses, abi } from "../constants";
import EthersContext from "../context/ethers-context";

const ConnectWallet = () => {
  //const [connectButtonText, setConnectButtonText] = useState("Connect");
  const [loading, setLoading] = useState(false);
  const [gameWon, setGameWon] = useState("");

  const ethersCtx = useContext(EthersContext);

  const depositHandler = async (e) => {
    setLoading(true);
    if (gameWon !== "") {
      setGameWon("");
    }
    console.log(`----contract----`);
    console.log(ethersCtx.contract);
    e.preventDefault();

    const gasPrice = await ethersCtx.contract.estimateGas.deposit({
      value: ethers.utils.parseEther("0.1"),
    });
    const tx = await ethersCtx.contract.deposit({
      value: ethers.utils.parseEther("0.1"),
      gasLimit: gasPrice,
    });

    console.log(`done`);
    const receipt = await tx.wait(1);
    console.log(`----receipt---`);
    console.log(receipt);
    setLoading(false);
  };

  ethersCtx.contract
    ? ethersCtx.contract.on("GameWon", (winner, amountWon) => {
        const amountInEth = ethers.utils.formatEther(amountWon);
        setGameWon(
          `You Won the game! The winning address is: ${winner} , with and amountWon of ${amountInEth} ETH}`
        );
        console.log(`game has been Won!`);
      })
    : null;

  return (
    <div>
      {loading ? <p>Loading...</p> : null}
      <button onClick={() => ethersCtx.onConnect()}>Connect</button>
      {ethersCtx.contract && <button onClick={depositHandler}>Deposit</button>}
      {gameWon && gameWon}
    </div>
  );
};

export default ConnectWallet;
