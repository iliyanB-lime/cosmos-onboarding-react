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

  const createStargateClient = async () => {
    const rpcEndpoint = await getRpcEndpoint();
    const client = await StargateClient.connect(rpcEndpoint);
    setStargateClient(client);
    return client;
  };

  useEffect(() => {
    createStargateClient();
  }, [chain]);

  const fetchBalance = async () => {
    if (!address) return;
    if (!stargateClient) {
      console.error("Stargate client not found");
      return;
    }
    try {
      const stakingToken = chain?.staking?.staking_tokens?.[0];
      if (!stakingToken) return;
      const balance = await stargateClient.getBalance(
        address,
        stakingToken.denom
      );
      setBalance(balance);
    } catch (error) {
      console.error("Failed to fetch balance", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [address, stargateClient, isWalletConnected]);

  return { balance, fetchBalance };
};
