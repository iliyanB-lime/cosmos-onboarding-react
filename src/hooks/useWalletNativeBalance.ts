import { StargateClient } from "@cosmjs/stargate";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { useEffect, useState } from "react";
import { useWalletConnection } from "./useWalletConnection";

export const useWalletNativeBalance = () => {
  const { address, isWalletConnected, chain, getRpcEndpoint } =
    useWalletConnection();
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
      const stakingToken = chain?.staking?.staking_tokens?.[0];
      if (!stakingToken) return;
      const balance = await internalClient.getBalance(
        address,
        stakingToken.denom
      );
      setBalance(balance);
    } catch (error) {
      console.error("Failed to fetch balance", error);
    }
  };

  useEffect(() => {
    if (isWalletConnected && address && chain) {
      fetchBalance();
    }
  }, [address, chain, isWalletConnected]);
  return { balance, fetchBalance };
};
