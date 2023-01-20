import React, { useContext, useEffect, useState, useCallback } from "react";
import EthersContext from "../context/ethers-context";
import SingleAddress from "./SingleAddress";

import styles from "./AddressBook.module.scss";

const AddressBook = () => {
  const ethersCtx = useContext(EthersContext);
  const [addressBook, setAddressBook] = useState([
    { address: null, name: null },
  ]);

  const getAddressBook = useCallback(async () => {
    let addressBookArray = [];
    const addresses = await ethersCtx.contract.getAddresses(
      ethersCtx.userAddress
    );

    for (const addy of addresses) {
      const name = await ethersCtx.contract.getAlias(addy);
      addressBookArray.push({ address: addy, name: name });
    }

    setAddressBook(addressBookArray);
  }, [ethersCtx.contract, ethersCtx.userAddress, setAddressBook]);

  useEffect(() => {
    console.log(`in addres book useffect`);
    getAddressBook();
  }, [getAddressBook]);

  return (
    <div className={styles.container}>
      {console.log(`rendering off AddressBook component`)}
      {addressBook.map((addy) => {
        {
          console.log(`mapping boy`);
        }
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
