import React, { useState, useContext } from "react";
import EthersContext from "../context/ethers-context";

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
    <div>
      <form onSubmit={addToAddressBook}>
        <label>Add Address</label>
        <input
          type="text"
          placeholder="0x123...345"
          onChange={handleAddressChange}
        ></input>
        <label>Add Name</label>
        <input
          type="text"
          placeholder="John"
          onChange={handleNameChange}
        ></input>
        <button>Add to AddressBook</button>
      </form>
    </div>
  );
};

export default AddAddress;
