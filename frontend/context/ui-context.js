import React, { useState, useContext, useCallback } from "react";
import EthersContext from "../context/ethers-context";

const UiContext = React.createContext({
  addressBook: null,
  updateUi: () => {},
});

export const UiContextProvider = (props) => {
  const [addressBook, setAddressBook] = useState([]);

  const ethersCtx = useContext(EthersContext);

  const updateUi = useCallback(async () => {
    let addressBookArray = [];
    const addresses = await ethersCtx.contract.getAddresses(
      ethersCtx.userAddress
    );

    for (const addy of addresses) {
      const name = await ethersCtx.contract.getAlias(addy);
      addressBookArray.push({ address: addy, name: name });
    }

    setAddressBook(addressBookArray);
  }, [ethersCtx.contract, ethersCtx.userAddress]);

  return (
    <UiContext.Provider
      value={{
        addressBook: addressBook,
        updateUi: updateUi,
      }}
    >
      {props.children}
    </UiContext.Provider>
  );
};

export default UiContext;
