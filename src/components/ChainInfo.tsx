import {
  Box,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
} from "@interchain-ui/react";
import { useWalletConnection } from "../hooks/useWalletConnection";
import { useWalletNativeBalance } from "../hooks/useWalletNativeBalance";

const ChainInfo = () => {
  const { address, chain, isWalletConnected, isWalletConnecting } =
    useWalletConnection();
  const { balance } = useWalletNativeBalance();

  if (!isWalletConnected) {
    return null;
  }

  if (isWalletConnecting) {
    return <Spinner />;
  }

  const { pretty_name, chain_name, status, chain_id, network_type, logo_URIs } =
    chain;

  return (
    <Box>
      <Text fontSize="28px" fontWeight="bold">
        Chain Info
      </Text>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Chain Logo:</strong>
            </TableCell>
            <TableCell>
              {logo_URIs?.png || logo_URIs?.svg ? (
                <img
                  src={logo_URIs.png || logo_URIs.svg}
                  alt={`${chain_name} logo`}
                  style={{ height: "32px" }}
                />
              ) : (
                "No logo available"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Chain Name:</strong>
            </TableCell>
            <TableCell>{pretty_name || chain_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Chain Status:</strong>
            </TableCell>
            <TableCell>
              <strong>{status}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Chain ID:</strong>
            </TableCell>
            <TableCell>{chain_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Connected Address:</strong>
            </TableCell>
            <TableCell>{address || "Not Connected"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Network Type:</strong>
            </TableCell>
            <TableCell>{network_type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Balance:</strong>
            </TableCell>
            <TableCell>{balance?.amount || "-"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default ChainInfo;
