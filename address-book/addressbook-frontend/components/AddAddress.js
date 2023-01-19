import React, { useState, useContext } from "react";
import EthersContext from "../context/ethers-context";

import styles from "./AddAddress.module.scss";

const AddAddress = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const ethersCtx = useContext(EthersContext);

  const addToAddressBook = async (e) => {
    e.preventDefault();
    await ethersCtx.contract.addAddressToAddressBook(address, name);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className={styles.addAddress}>
      <form onSubmit={addToAddressBook} className={styles.form}>
        <label className={styles.label}>Address</label>
        <input
          className={styles.input}
          type="text"
          placeholder="0x123...345"
          onChange={handleAddressChange}
        ></input>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          placeholder="John"
          onChange={handleNameChange}
        ></input>
        <button className={styles.button}>Add to AddressBook</button>
      </form>
    </div>
  );
};

export default AddAddress;
