import React, { useContext } from "react";
import EthersContext from "../context/ethers-context";

import styles from "./DeleteAddress.module.scss";

const DeleteAddress = (props) => {
  const ethersCtx = useContext(EthersContext);

  const deleteAddressHandler = async () => {
    await ethersCtx.contract.deleteAdddress(props.address);
  };

  return (
    <div>
      <button
        className={styles.button}
        role="button"
        onClick={deleteAddressHandler}
      >
        X
      </button>
    </div>
  );
};

export default DeleteAddress;
