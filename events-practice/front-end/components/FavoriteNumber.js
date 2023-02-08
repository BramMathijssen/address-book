import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "./FavoriteNumber.module.scss";
import UiContext from "../context/ui-context";
import EthersContext from "../context/ethers-context";

const FavoriteNumber = () => {
  const uiCtx = useContext(UiContext);
  const ethersCtx = useContext(EthersContext);
  const [favoriteNumber, setFavoriteNumber] = useState();
  const [loading, setLoading] = useState(false);
  const numberInputRef = useRef();

  const setNewNumberHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    const enteredNumber = numberInputRef.current.value;
    const tx = await ethersCtx.contract.newNumber(enteredNumber);
    console.log(tx);
    const receipt = await tx.wait(1);

    // --- events from receipt ----
    console.log(receipt);
    const test = receipt.events[0].args[1]._hex.toString();
    const testNr = parseInt(test);
    console.log(test);
    console.log(testNr);

    // --- logs from receipt ----
    const logs = receipt.logs;
    console.log(logs);

    // --- topics from logs ----
    const topics = logs[0].topics[2];
    const number = parseInt(topics);
    console.log(number);

    setFavoriteNumber(testNr);
    setLoading(false);
  };

  // executes once app initialisation 
  useEffect(() => {
    async function getNumber() {
      const number = (await ethersCtx.contract.s_myFavoriteNumber()).toString();
      setFavoriteNumber(number);
    }
    getNumber();
  }, []);

  ethersCtx.contract.on("changedNumber", (from, newNumber) => {
    setFavoriteNumber(newNumber.toString());
  });

  return (
    <div className={styles.container}>
      {loading ? <p>Loading...</p> : <p>{favoriteNumber}</p>}
      <form onSubmit={setNewNumberHandler}>
        <label>Give your Favorite Number</label>
        <input id="number" type="number" ref={numberInputRef}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FavoriteNumber;
