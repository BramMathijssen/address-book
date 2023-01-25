import React, { useState, useContext, useCallback } from "react";
import EthersContext from "../context/ethers-context";

const UiContext = React.createContext({
  addressBook: null,
  updateUi: () => {},
});

export const UiContextProvider = (props) => {
  const [addressBook, setAddressBook] = useState();

  const ethersCtx = useContext(EthersContext);

  const updateUi = useCallback(async () => {
    const number = (await ethersCtx.contract.s_myFavoriteNumber()).toString();

    setAddressBook(number);
  }, []);

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
