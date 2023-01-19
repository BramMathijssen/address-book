import { EthersContextProvider } from "../context/ethers-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <EthersContextProvider>
      <Component {...pageProps} />
    </EthersContextProvider>
  );
}

export default MyApp;
