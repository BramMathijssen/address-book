import React from "react";
import ReactModal from "react-modal";

import styles from "./EditModal.module.scss";

const EditModal = () => {
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
        isOpen={true}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <h1>Edit</h1>
        <p>Edit the Address here</p>
      </ReactModal>
    </div>
  );
};

export default EditModal;
