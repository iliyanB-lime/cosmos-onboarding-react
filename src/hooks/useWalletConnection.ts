import { useChain } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { AssetList } from "@chain-registry/types";
import { DEFAULT_CHAIN_ID } from "../constants";
import { useMemo } from "react";

const chain = chains.find((c) => c.chain_id === DEFAULT_CHAIN_ID);

export const useWalletConnection = () => {
  const chainData = useChain(chain?.chain_name || "", false);
  const chainassets = useMemo(
    () =>
      (assets.find((c) => c.chain_name === chain?.chain_name) as AssetList) ||
      [],
    []
  );

  return { ...chainData, assets: chainassets };
};
