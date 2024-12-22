import { NAME2ID_MAP } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { PoolAddress } from '@src/config';
import { useCallback, useEffect, useState } from 'react';

import { createLegendFactoryContract } from '../api/createContract';
import { useBalanceStore } from '../store/store';

export interface IPoolInfo {
  pid: number | null;
  startTime?: number;
  endTime?: number;
  name: string;
}

export default function usePoolInfo(): { poolInfo?: IPoolInfo[]; networkError: boolean } {
  const wallet = useWallet();
  const { state } = useBalanceStore(s => s);
  const [poolInfo, setPoolInfo] = useState<IPoolInfo[]>();
  const [networkError, setNetworkError] = useState(false);
  const fetchNetworkStatus = useCallback(async () => {
    if (wallet.provider && wallet.account) {
      const chainId = await wallet.getChainId();
      if (chainId !== NAME2ID_MAP[state.network]) {
        setNetworkError(true);
      } else {
        setNetworkError(false);
      }
    }
    if (wallet.provider) {
      const PoolArr = PoolAddress[state.network];
      const tmp: IPoolInfo[] = [];
      try {
        for (let i = 0; i < PoolArr.length; i++) {
          if (PoolArr[i].pid) {
            const res = await createLegendFactoryContract(wallet.provider, PoolArr[i].legendFactory, PoolArr[i].pid);
            const time = await res[0].pool(PoolArr[i].pid);
            tmp.push({
              startTime: time.startTime.toNumber(),
              endTime: time.endTime.toNumber(),
              name: PoolArr[i].name,
              pid: PoolArr[i].pid,
            });
          } else {
            tmp.push({
              name: PoolArr[i].name,
              pid: PoolArr[i].pid,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
      setPoolInfo(tmp);
    }
  }, [wallet, state.network]);

  useEffect(() => {
    fetchNetworkStatus();
  }, [wallet, state.network, fetchNetworkStatus]);

  return {
    poolInfo,
    networkError,
  };
}
