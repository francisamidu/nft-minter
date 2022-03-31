import { AppProps } from "next/app";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import "../styles/index.scss";
import "../node_modules/tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Web3ReactProvider } from "@web3-react/core";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";

import {
  AppContextProvider,
  AssetsContextProvider,
  ContractProvider,
  TabContextProvider,
} from "../contexts";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const getLibrary = (provider: ExternalProvider) => new Web3Provider(provider);

const App = ({ Component, pageProps }: AppPropsWithLayout): unknown => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppContextProvider>
        <ContractProvider>
          <AssetsContextProvider>
            <ToastContainer />
            <TabContextProvider>
              {getLayout(<Component {...pageProps} />)}
            </TabContextProvider>
          </AssetsContextProvider>
        </ContractProvider>
      </AppContextProvider>
    </Web3ReactProvider>
  );
};

export default App;
