import { createContext, useState } from "react";
import { SUPPORTED_CHAIN_IDS } from "../constants";

interface ChainContextType {
  chainId: string;
  setChainId: (chainId: string) => void;
}

export const ChainContext = createContext<ChainContextType>({
  chainId: "",
  setChainId: () => {},
});

export const ChainProvider = ({ children }: { children: React.ReactNode }) => {
  const [chainId, setChainId] = useState<string>(SUPPORTED_CHAIN_IDS[0]);
  return (
    <ChainContext.Provider value={{ chainId, setChainId }}>
      {children}
    </ChainContext.Provider>
  );
};
