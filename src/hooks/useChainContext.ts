import { useContext } from "react";
import { ChainContext } from "../context/ChainContext";

export const useChainContext = () => {
  return useContext(ChainContext);
};
