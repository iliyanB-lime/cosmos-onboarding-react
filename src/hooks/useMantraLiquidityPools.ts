import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useEffect, useState } from "react";
import { MANTRA_LIQUIDITY_POOLS_CONTRACT } from "../constants";
import { useWalletConnection } from "./useWalletConnection";
import { LiquidityPool, LiquidityPoolResponse } from "../types/liquidityPool";

export const useMantraLiquidityPools = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, isWalletConnected, chain, getRpcEndpoint } =
    useWalletConnection();
  const [cosmosClient, setCosmosClient] = useState<CosmWasmClient | null>(null);
  const [liquidityPools, setLiquidityPools] = useState<LiquidityPool[]>([]);

  const fetchLiquidityPools = async () => {
    if (chain && chain.chain_id !== "mantra-dukong-1") {
      setLiquidityPools([]);
      return;
    }
    if (!address) return;
    setIsLoading(true);
    let internalClient = cosmosClient;
    if (!internalClient) {
      try {
        const rpcEndpoint = await getRpcEndpoint();
        internalClient = await CosmWasmClient.connect(rpcEndpoint);
        setCosmosClient(internalClient);
      } catch (error) {
        console.error("Failed to connect to stargate client", error);
        return;
      }
    }
    try {
      const poolsResponse = (await internalClient.queryContractSmart(
        MANTRA_LIQUIDITY_POOLS_CONTRACT,
        {
          pools: {},
        }
      )) as LiquidityPoolResponse;
      setLiquidityPools(poolsResponse.pools);
    } catch (error) {
      console.error("Failed to fetch balance", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isWalletConnected && address) {
      fetchLiquidityPools();
    }
  }, [address, chain, isWalletConnected]);

  return { liquidityPools, fetchLiquidityPools, isLoading };
};
