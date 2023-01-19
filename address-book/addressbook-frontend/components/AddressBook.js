import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../context/ethers-context";
import SingleAddress from "./SingleAddress";

import styles from './AddressBook.module.scss'

const AddressBook = () => {
  const ethersCtx = useContext(EthersContext);
  const [addressBook, setAddressBook] = useState([
    { address: null, name: null },
  ]);

  const getAddressBook = async () => {
    let addressBookArray = [];
    const addresses = await ethersCtx.contract.getAddresses(
      ethersCtx.userAddress
    );

    for (const addy of addresses) {
      const name = await ethersCtx.contract.getAlias(addy);
      addressBookArray.push({ address: addy, name: name });
    }

    setAddressBook(addressBookArray);
  };

  useEffect(() => {
    getAddressBook();
  }, []);

  return (
    <div className={styles.container}>
      {addressBook.map((addy) => {
        {console.log(`mapping boy`)}
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
