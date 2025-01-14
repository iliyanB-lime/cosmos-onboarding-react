import { wallets } from "@cosmos-kit/keplr";
import { ChainProvider } from "@cosmos-kit/react";
import "@interchain-ui/react/styles";
import { assets, chains } from "chain-registry";
import Header from "./components/Header";
import { Box } from "@interchain-ui/react";
import ChainInfo from "./components/ChainInfo";
import ChainAssets from "./components/ChainAssets";

function App() {
  return (
    <ChainProvider chains={chains} assetLists={assets} wallets={wallets}>
      <Box
        display="flex"
        flexDirection="column"
        width="100vw"
        height="100vh"
        overflow="hidden"
      >
        <Header />
        <ChainInfo />
        <ChainAssets />
      </Box>
    </ChainProvider>
  );
}

export default App;
