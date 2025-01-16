import { AssetList } from "@chain-registry/types";
import { useChain } from "@cosmos-kit/react";
import { assets, chains } from "chain-registry";
import { useMemo } from "react";
import { useChainContext } from "../hooks/useChainContext";

export const useWalletConnection = () => {
  const { chainId } = useChainContext();
  const chain = chains.find((c) => c.chain_id === chainId);
  const chainData = useChain(chain?.chain_name || "", false);
  const chainassets = useMemo(
    () =>
      (assets.find((c) => c.chain_name === chain?.chain_name) as AssetList) ||
      [],
    [chain?.chain_name]
  );

  return { ...chainData, assets: chainassets };
};
