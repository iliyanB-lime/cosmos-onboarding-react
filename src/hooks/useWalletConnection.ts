import { useChain } from "@cosmos-kit/react";
import { chains } from "chain-registry";
import { DEFAULT_CHAIN_ID } from "../constants";

const chain = chains.find((c) => c.chain_id === DEFAULT_CHAIN_ID);

export const useWalletConnection = () => {
  const chainData = useChain(chain?.chain_name || "", false);

  return { ...chainData };
};
