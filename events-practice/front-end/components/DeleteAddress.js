import React, { useContext } from "react";
import EthersContext from "../context/ethers-context";
import { motion } from "framer-motion";
import { X } from "phosphor-react";

import styles from "./DeleteAddress.module.scss";
import UiContext from "../context/ui-context";

const DeleteAddress = (props) => {
  const ethersCtx = useContext(EthersContext);
  const uiCtx = useContext(UiContext);

  const deleteAddressHandler = async () => {
    const tx = await ethersCtx.contract.deleteAdddress(props.address);
    await tx.wait(1);
    uiCtx.updateUi();
  };

  return (
    <div>
      <motion.div
        whileHover={{
          scale: 1.1,
          color: "#D7385E",
        }}
      >
        <X
          className={styles.close}
          size={30}
          address={props.address}
          onClick={deleteAddressHandler}
        />
      </motion.div>
    </div>
  );
};

export default DeleteAddress;
