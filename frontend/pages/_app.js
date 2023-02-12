import { EthersContextProvider } from "../context/ethers-context";
import { UiContextProvider } from "../context/ui-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <EthersContextProvider>
      <UiContextProvider>
        <Component {...pageProps} />
      </UiContextProvider>
    </EthersContextProvider>
  );
}

export default MyApp;
