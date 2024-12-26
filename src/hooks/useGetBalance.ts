import { Chain } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { getValidRpc } from '@src/common/getValidRpc';
import { getRpc } from '@src/common/getValidRpc';
import { dbg } from '@src/common/log';
import { BigNumber, ethers } from 'ethers';
import { useCallback } from 'react';

import { useIsLogined } from './useIsLogined';
import { useWalletRef } from './useWalletRef';

export const useGetBalance = () => {
  const wallet = useWallet();
  const isLogined = useIsLogined();
  return useCallback(
    (chain: any) => {
      if (!wallet.provider || !wallet.account) {
        return Promise.resolve(BigNumber.from(0));
      }
      if (!isLogined) {
        return Promise.resolve(BigNumber.from(0));
      }
      // const rpc = getValidRpc(chain);//EXPchain
      const rpc = getRpc(chain.shortName);
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      dbg('====>fetch balance...', chain?.shortName);
      return provider.getBalance(wallet?.account);
    },
    [isLogined, wallet]
  );
};
