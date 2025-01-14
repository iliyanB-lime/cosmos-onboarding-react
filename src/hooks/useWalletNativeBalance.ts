import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { useEffect, useState } from "react";
import { DEFAULT_ASSET_DENOM } from "../constants";
import { useWalletConnection } from "./useWalletConnection";
import { StargateClient } from "@cosmjs/stargate";

export const useWalletNativeBalance = () => {
  const { address, isWalletConnected, getRpcEndpoint } = useWalletConnection();
  const [stargateClient, setStargateClient] = useState<StargateClient | null>(
    null
  );
  const [balance, setBalance] = useState<Coin | undefined>();

  const fetchBalance = async () => {
    if (!address) return;
    let internalClient = stargateClient;
    if (!internalClient) {
      try {
        const rpcEndpoint = await getRpcEndpoint();
        internalClient = await StargateClient.connect(rpcEndpoint);
        setStargateClient(internalClient);
      } catch (error) {
        console.error("Failed to connect to stargate client", error);
        return;
      }
    }
    try {
      const balance = await internalClient.getBalance(
        address,
        DEFAULT_ASSET_DENOM
      );
      setBalance(balance);
    } catch (error) {
      console.error("Failed to fetch balance", error);
    }
  };

  useEffect(() => {
    if (isWalletConnected && address) {
      fetchBalance();
    }
  }, [address, isWalletConnected]);
  return { balance, fetchBalance };
};
