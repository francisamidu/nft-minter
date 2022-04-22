import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type AppValues = {
  darkMode: boolean;
  name: string;
  year: number;
};
const AppContext = createContext<
  Partial<{
    darkMode: boolean;
    name: string;
    year: number;
    setData: Dispatch<SetStateAction<Partial<AppValues>>>;
  }>
>({
  darkMode: false,
  name: "",
  year: 0,
  setData: () => {},
});

export const AppContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState({
    darkMode: false,
    name: "NFTMinter",
    year: new Date().getFullYear(),
  });

  return (
    <AppContext.Provider
      value={{
        ...data,
        setData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
