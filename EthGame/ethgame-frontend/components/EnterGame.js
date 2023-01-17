import { React, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import EthersContext from "../context/ethers-context";

const EnterGame = () => {
  const [loading, setLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const ethersCtx = useContext(EthersContext);

  const depositHandler = async (e) => {
    e.preventDefault();
    console.log(`amount deposited is ${depositAmount}`);

    setLoading(true);
    // if (gameWon !== "") {
    //   setGameWon("");
    // }
    console.log(`----contract----`);
    console.log(ethersCtx.contract);
    e.preventDefault();

    const gasPrice = await ethersCtx.contract.estimateGas.deposit({
      value: ethers.utils.parseEther(depositAmount),
    });
    const tx = await ethersCtx.contract.deposit({
      value: ethers.utils.parseEther(depositAmount),
      gasLimit: gasPrice,
    });

    await tx.wait(1);
    setLoading(false);
  };

  const handleDepositAmountChange = (e) => {
    setDepositAmount(e.target.value);
  };

  return (
    <div>
      {loading ? <p>Loading...</p> : null}
      <form onSubmit={depositHandler}>
        <label>Enter Amount:</label>
        <input
          type="text"
          placeholder="0"
          onChange={handleDepositAmountChange}
        ></input>
        {ethersCtx.contract && <button>Deposit</button>}
      </form>
    </div>
  );
};

export default EnterGame;
