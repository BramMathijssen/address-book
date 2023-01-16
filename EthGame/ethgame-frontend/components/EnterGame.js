import { React, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import EthersContext from "../context/ethers-context";

const EnterGame = () => {
  const [loading, setLoading] = useState(false);
  const ethersCtx = useContext(EthersContext);

  const depositHandler = async (e) => {
    setLoading(true);
    // if (gameWon !== "") {
    //   setGameWon("");
    // }
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

    await tx.wait(1);
    setLoading(false);
  };
  return (
    <div>
      {loading ? <p>Loading...</p> : null}
      <label>Enter Amount:</label>
      <input type="number"></input>
      {ethersCtx.contract && <button onClick={depositHandler}>Deposit</button>}
    </div>
  );
};

export default EnterGame;
