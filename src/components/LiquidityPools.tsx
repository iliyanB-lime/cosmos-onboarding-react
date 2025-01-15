import { useMantraLiquidityPools } from "../hooks/useMantraLiquidityPools";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRowHeaderCell,
  TableRow,
  Text,
} from "@interchain-ui/react";

const LiquidityPools = () => {
  const { liquidityPools, isLoading } = useMantraLiquidityPools();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!liquidityPools?.length) {
    return <Text>No liquidity pools found</Text>;
  }

  return (
    <Box overflow="auto">
      <Text fontSize="28px" fontWeight="bold">
        Liquidity Pools
      </Text>
      <Table>
        <TableHead>
          <TableRow>
            <TableRowHeaderCell>Pool ID</TableRowHeaderCell>
            <TableRowHeaderCell>Pool Type</TableRowHeaderCell>
            <TableRowHeaderCell>Assets</TableRowHeaderCell>
            <TableRowHeaderCell>Total Share</TableRowHeaderCell>
            <TableRowHeaderCell>Swap Fee</TableRowHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {liquidityPools?.map((pool) => (
            <TableRow key={pool.pool_info.pool_identifier}>
              <TableCell>{pool.pool_info.pool_identifier}</TableCell>
              <TableCell>
                {typeof pool.pool_info.pool_type === "string"
                  ? pool.pool_info.pool_type
                  : "Stable Swap"}
              </TableCell>
              <TableCell>
                <Box display="flex" flexDirection="column">
                  {pool.pool_info.assets.map((asset, index) => (
                    <Text key={index}>
                      {asset.amount} {asset.denom}
                    </Text>
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                {pool.total_share.amount} {pool.total_share.denom}
              </TableCell>
              <TableCell>{pool.pool_info.pool_fees.swap_fee.share}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default LiquidityPools;
