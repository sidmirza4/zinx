import type { AppProps } from "next/app";
import AppContextProvider from "../context/AppContext";
import { ToastContainer } from "react-toastify";
import { NoMetaMaskModal } from "../components";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
      <NoMetaMaskModal />
    </AppContextProvider>
  );
}

export default MyApp;
