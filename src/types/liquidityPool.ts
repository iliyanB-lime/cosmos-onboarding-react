interface PoolFee {
  share: string;
}

interface PoolFees {
  protocol_fee: PoolFee;
  swap_fee: PoolFee;
  burn_fee: PoolFee;
  extra_fees: PoolFee[];
}

interface Asset {
  denom: string;
  amount: string;
}

interface PoolInfo {
  pool_identifier: string;
  asset_denoms: string[];
  lp_denom: string;
  asset_decimals: number[];
  assets: Asset[];
  pool_type: string | { stable_swap: { amp: number } };
  pool_fees: PoolFees;
}

interface TotalShare {
  denom: string;
  amount: string;
}

export interface LiquidityPoolResponse {
  pools: LiquidityPool[];
}

export interface LiquidityPool {
  pool_info: PoolInfo;
  total_share: TotalShare;
}
