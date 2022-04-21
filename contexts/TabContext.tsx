import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { uid } from "../helpers";

const TabContext = createContext(null);

export const TabContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [tabs, setTabs] = useState([
    {
      id: uid(),
      active: true,
      name: "Mint an NFT",
    },
    {
      id: uid(),
      active: false,
      name: "View NFT",
    },
    {
      id: uid(),
      active: false,
      name: "Publish to Opensea",
    },
  ]);

  return (
    <TabContext.Provider value={{ tabs, setTabs }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => useContext(TabContext);
