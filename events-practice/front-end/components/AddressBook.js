import React, { useContext, useEffect, useState } from "react";

import styles from "./AddressBook.module.scss";
import UiContext from "../context/ui-context";
import EthersContext from "../context/ethers-context";

const AddressBook = () => {
  const uiCtx = useContext(UiContext);
  const ethersCtx = useContext(EthersContext);
  const [addressBook, setAddressBook] = useState();

  useEffect(() => {
    // console.log(`in addres book useffect`);
    // uiCtx.updateUi();
    async function getNumber() {
      const number = (await ethersCtx.contract.s_myFavoriteNumber()).toString();
      setAddressBook(number);
    }
    getNumber();
  }, []);

  return (
    <div className={styles.container}>
      <p>{addressBook}</p>
    </div>
  );
};

export default AddressBook;
