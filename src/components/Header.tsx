import {
  Box,
  Button,
  Item,
  Select,
  SelectOption,
  Text,
} from "@interchain-ui/react";
import { SUPPORTED_CHAIN_IDS } from "../constants";
import { useChainContext } from "../hooks/useChainContext";
import { useWalletConnection } from "../hooks/useWalletConnection";

const Header = () => {
  const { setChainId } = useChainContext();
  const { connect, disconnect, chain, isWalletConnected } =
    useWalletConnection();

  const handleButtonClick = () => {
    if (isWalletConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const handleChainChange = (item: Item | null) => {
    if (item) {
      setChainId(item.key);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="1rem"
      backgroundColor="background"
    >
      <Text>CosmosKit Example</Text>
      {isWalletConnected && <Text>Connected to {chain.pretty_name}</Text>}
      <Box display="flex" gap="1rem">
        {!isWalletConnected && (
          <Select onSelectItem={handleChainChange}>
            {SUPPORTED_CHAIN_IDS.map((chainId) => (
              <SelectOption key={chainId} optionKey={chainId} label={chainId}>
                {chainId}
              </SelectOption>
            ))}
          </Select>
        )}
        <Button onClick={handleButtonClick}>
          {isWalletConnected ? "Disconnect" : "Connect Wallet"}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
