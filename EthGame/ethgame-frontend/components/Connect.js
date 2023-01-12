import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Button from "./Button";

const Connect = () => {
  const [buttonProps, setButtonProps] = useState("Connect");
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState("");
  const [account, setAccount] = useState("");
  const [myState2, setMyState2] = useState("Second State");
  const [myState3, setMyState3] = useState("ThirdState");

  useEffect(() => {
    // pattern om async function in een useEffect te gebruiken
    async function connectButton() {
      if (typeof window.ethereum !== "undefined") {
        console.log(`ethereum wallet found`);
        try {
          await ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
          console.log(error);
        }
        console.log(`connected`);
        const accountsTemp = await ethereum.request({ method: "eth_accounts" });
        const providerTemp = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(providerTemp);
        setAccount(accountsTemp)
        console.log(provider);
        setAddress(accountsTemp[0]);
        setButtonProps("Connected");
        updateEthers();
      } else {
        console.log(`please install MM`);
        setButtonProps("Please Install MetaMask");
      }
    }
    connectButton();
  }, [buttonProps, address]);

  const updateEthers = async () => {
    const balance = await provider.getBalance(account[0]);
    console.log(balance);
  };

  return (
    <div>
      <p>{address}</p>
      <p>{myState2}</p>
      <p>{myState3}</p>
      <Button name={buttonProps}></Button>
    </div>
  );
};

export default Connect;
