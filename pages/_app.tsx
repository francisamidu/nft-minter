import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import "../styles/index.scss";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
  AppContextProvider,
  AssetsContextProvider,
  ContractProvider,
  TabContextProvider,
  WalletContextProvider,
} from "../contexts";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout): unknown => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ContractProvider>
      <WalletContextProvider>
        <AppContextProvider>
          <AssetsContextProvider>
            <ToastContainer />
            <TabContextProvider>
              {getLayout(<Component {...pageProps} />)}
            </TabContextProvider>
          </AssetsContextProvider>
        </AppContextProvider>
      </WalletContextProvider>
    </ContractProvider>
  );
};

export default App;
