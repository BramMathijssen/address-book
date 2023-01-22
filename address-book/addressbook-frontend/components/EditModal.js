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
            height: "40%",
            margin: "auto auto",
            borderRadius: "10px",
          },
        }}
        isOpen={props.show}
        onRequestClose={props.closeModal}
        shouldCloseOnOverlayClick={true}
        shouldReturnFocusAfterClose={true}
        shouldCloseOnEsc={true}
      >
        <h1>Edit</h1>
        <p>Change the name for address: {props.address}</p>
        <div className={styles.avatar} ref={props.avatar} />
        <form className={styles.form} onSubmit={editHandler}>
          <div className={styles.container}>
            <label className={styles.label}>Address</label>
            <input
              className={styles.inputAddress}
              type="text"
              onChange={handleAddressChange}
              placeholder={props.address}
              disabled={true}
            ></input>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              onChange={handleNameChange}
              placeholder={props.name}
            ></input>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Edit
            </button>
            <button className={styles.closeButton} onClick={props.closeModal}>
              Close
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default EditModal;
