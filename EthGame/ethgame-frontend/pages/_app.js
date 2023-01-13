import "../styles/globals.css";

import { React, useState, useEffect } from "react";
import { EthersContextProvider } from "../context/ethers-context";

function MyApp({ Component, pageProps }) {
  return (
    <EthersContextProvider>
      <Component {...pageProps} />
    </EthersContextProvider>
  );
}

export default MyApp;
