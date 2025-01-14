import { useChain } from "@cosmos-kit/react";
import { Box, Button, Text } from "@interchain-ui/react";
import { chains } from "chain-registry";

const chain = chains.find((c) => c.chain_id === "osmo-test-5");

const Header = () => {
  const { connect, disconnect, isWalletConnected } = useChain(
    chain?.chain_name || "",
    false
  );

  const handleButtonClick = () => {
    if (isWalletConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="1rem"
      backgroundColor="background"
      borderBottom="1px solid"
      borderColor="border"
    >
      <Text>CosmosKit Example</Text>
      <Button onClick={handleButtonClick}>
        {isWalletConnected ? "Disconnect" : "Connect Wallet"}
      </Button>
    </Box>
  );
};

export default Header;
