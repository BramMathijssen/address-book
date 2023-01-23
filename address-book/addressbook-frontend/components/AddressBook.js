import React, { useContext, useEffect } from "react";
import SingleAddress from "./SingleAddress";

import styles from "./AddressBook.module.scss";
import UiContext from "../context/ui-context";

const AddressBook = () => {
  const uiCtx = useContext(UiContext);

  useEffect(() => {
    console.log(`in addres book useffect`);
    uiCtx.updateUi();
  }, []);

  return (
    <div className={styles.container}>
      {uiCtx.addressBook &&
        uiCtx.addressBook.map((addy) => {
          return (
            <SingleAddress
              key={Math.random()}
              address={addy.address}
              name={addy.name}
            />
          );
        })}
    </div>
  );
};

export default AddressBook;
