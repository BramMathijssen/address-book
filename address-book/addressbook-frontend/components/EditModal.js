import React, { useState, useContext } from "react";
import ReactModal from "react-modal";
import EthersContext from "../context/ethers-context";

import styles from "./EditModal.module.scss";

const EditModal = (props) => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const ethersCtx = useContext(EthersContext);

  const editHandler = async (e) => {
    e.preventDefault();
    await ethersCtx.contract.editAddress(address, name);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div>
      {console.log(`modal time homie`)}
      <ReactModal
        style={{
          content: {
            width: "40%",
            height: "30%",
            margin: "auto auto",
          },
        }}
        isOpen={props.show}
        onRequestClose={props.closeModal}
        shouldCloseOnOverlayClick={true}
        shouldReturnFocusAfterClose={true}
        shouldCloseOnEsc={true}
      >
        <h1>Edit</h1>
        <p>Edit the Address here</p>
        <form onSubmit={editHandler}>
          <label>Name</label>
          <input type="text" onChange={handleNameChange}></input>
          <label>Address</label>
          <input type="text" onChange={handleAddressChange}></input>
          <button>Edit</button>
        </form>
        <button onClick={props.closeModal}>Close Modal</button>
      </ReactModal>
    </div>
  );
};

export default EditModal;
