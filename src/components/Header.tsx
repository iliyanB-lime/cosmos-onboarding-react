import { Box, Button, Text } from "@interchain-ui/react";
import { useWalletConnection } from "../hooks/useWalletConnection";

const Header = () => {
  const { connect, disconnect, isWalletConnected } = useWalletConnection();

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
    >
      <Text>CosmosKit Example</Text>
      <Button onClick={handleButtonClick}>
        {isWalletConnected ? "Disconnect" : "Connect Wallet"}
      </Button>
    </Box>
  );
};

export default Header;
