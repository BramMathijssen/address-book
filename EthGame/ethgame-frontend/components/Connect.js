import React, { useEffect, useState } from "react";
import Button from "./Button";

const Connect = () => {
  const [buttonProps, setButtonProps] = useState("Connect");
  const [myState, setMyState] = useState("WELCOME TO MY STATE");
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
        const accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
        setButtonProps("Connected");
      } else {
        console.log(`please install MM`);
        setButtonProps("Please Install MetaMask");
      }
    }
    connectButton();
  }, [buttonProps]);

  return (
    <div>
      <p>heyassszff</p>
      <p>{myState}</p>
      <p>{myState2}</p>
      <p>{myState3}</p>
      <Button name={buttonProps}></Button>
    </div>
  );
};

export default Connect;
