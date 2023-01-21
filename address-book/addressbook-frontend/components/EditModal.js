import React, { useState } from "react";
import ReactModal from "react-modal";

import styles from "./EditModal.module.scss";

const EditModal = (props) => {

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
        <button onClick={props.closeModal}>Close Modal</button>
      </ReactModal>
    </div>
  );
};

export default EditModal;
