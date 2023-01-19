import React, { useContext } from "react";
import EthersContext from "../context/ethers-context";

const DeleteAddress = (props) => {
  const ethersCtx = useContext(EthersContext);

  const deleteAddressHandler = async () => {
    await ethersCtx.contract.deleteAdddress(props.address);
  };

  return (
    <div>
      <button onClick={deleteAddressHandler}>delete</button>
    </div>
  );
};

export default DeleteAddress;
