import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from "@interchain-ui/react";
import { useWalletConnection } from "../hooks/useWalletConnection";

const ChainAssets = () => {
  const { assets, isWalletConnected } = useWalletConnection();

  if (!isWalletConnected) {
    return null;
  }

  if (!assets?.assets?.length) {
    return (
      <Box padding="4">
        <Text>No assets found</Text>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Text fontSize="28px" fontWeight="bold">
        Assets
      </Text>
      <Table width="100%">
        <TableHead>
          <TableRow>
            <TableCell>
              <Text fontSize="18px" fontWeight="bold">
                Symbol
              </Text>
            </TableCell>
            <TableCell>
              <Text fontSize="18px" fontWeight="bold">
                Details
              </Text>
            </TableCell>
            <TableCell>
              <Text fontSize="18px" fontWeight="bold">
                Description
              </Text>
            </TableCell>
            <TableCell>
              <Text fontSize="18px" fontWeight="bold">
                Address
              </Text>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.assets.map((asset) => (
            <TableRow key={asset.base}>
              <TableCell>
                {asset.logo_URIs?.png || asset.logo_URIs?.svg ? (
                  <Box display="flex" alignItems="center" gap="2">
                    <img
                      src={asset.logo_URIs.png || asset.logo_URIs.svg}
                      alt={`${asset.name} logo`}
                      style={{
                        height: "32px",
                        width: "32px",
                        objectFit: "contain",
                      }}
                    />
                    <Text>{asset.symbol}</Text>
                  </Box>
                ) : (
                  <Text>{asset.symbol}</Text>
                )}
              </TableCell>
              <TableCell>
                <Text>{asset.name}</Text>
              </TableCell>
              <TableCell>
                <Text>{asset.description || "No description available"}</Text>
              </TableCell>
              <TableCell>
                <Text>{asset.base}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ChainAssets;
