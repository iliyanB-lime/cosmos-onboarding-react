import { wallets } from "@cosmos-kit/keplr";
import { ChainProvider } from "@cosmos-kit/react";
import { assets, chains } from "chain-registry";

// Import this in your top-level route/layout
import "@interchain-ui/react/styles";

function App() {
  return (
    <ChainProvider chains={chains} assetLists={assets} wallets={wallets}>
      <div>
        <h1>Hello World</h1>
      </div>
    </ChainProvider>
  );
}

export default App;
