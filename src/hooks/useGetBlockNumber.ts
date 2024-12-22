import { Name2CHAIN_MAP, RawChainType } from '@c3/chain';
import { getValidRpc } from '@src/common/getValidRpc';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';

import { useWalletRef } from './useWalletRef';

export const useGetBlockNumber = () => {
  return useCallback(async (shortName: RawChainType['shortName']) => {
    const rpc = getValidRpc(Name2CHAIN_MAP[shortName]);
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    return await provider.getBlockNumber();
  }, []);
};
