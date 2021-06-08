import { createContext, useContext, useState, FC } from "react";

interface IWolfContext {
  huffRecord: boolean[];
  addHuff: (isSuccessfulHuff: boolean) => void;
}

export const WolfContext = createContext<IWolfContext|undefined>(undefined);

export const WolfContextProvider: FC = ({ children }) => {
  
  const [huffRecord, setHuffRecord] = useState<boolean[]>([]);

  const addHuff = (isSuccessfulHuff: boolean) => setHuffRecord((prev) => [...prev, isSuccessfulHuff]);

  return (
    <WolfContext.Provider
      value={{huffRecord, addHuff}}
    >
      {children}
    </WolfContext.Provider>
  );
};

export const useWolfContext = () => {
  const context = useContext(WolfContext);

  if (context === undefined) {
    throw new Error("useWolfContext must be used within a WolfContextProvicer")
  }

  return context;
}
