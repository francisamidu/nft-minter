import { AppProps } from "next/app";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import "../styles/index.scss";
import "../node_modules/tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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

const App = ({ Component, pageProps }: AppPropsWithLayout): unknown => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AppContextProvider>
      <AssetsContextProvider>
        <ToastContainer />
        <TabContextProvider>
          <ContractProvider>
            {getLayout(<Component {...pageProps} />)}
          </ContractProvider>
        </TabContextProvider>
      </AssetsContextProvider>
    </AppContextProvider>
  );
};

export default App;
