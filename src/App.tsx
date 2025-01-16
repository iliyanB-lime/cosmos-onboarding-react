import { wallets } from "@cosmos-kit/keplr";
import { ChainProvider } from "@cosmos-kit/react";
import { Box } from "@interchain-ui/react";
import "@interchain-ui/react/styles";
import { assets, chains } from "chain-registry";
import ChainAssets from "./components/ChainAssets";
import ChainInfo from "./components/ChainInfo";
import Header from "./components/Header";
import LiquidityPools from "./components/LiquidityPools";
import { ChainProvider as ChainContextProvider } from "./context/ChainContext";

function App() {
  return (
    <ChainProvider chains={chains} assetLists={assets} wallets={wallets}>
      <ChainContextProvider>
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
          <LiquidityPools />
        </Box>
      </ChainContextProvider>
    </ChainProvider>
  );
}

export default App;
