import { Name2CHAIN_MAP, NAME2ID_MAP } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { useBalanceStore } from '@src/pages/Mint/store/store';
import { useCallback } from 'react';

export const useSwitch2Opbnb = () => {
  const wallet = useWallet();
  const { state } = useBalanceStore(s => s);
  return useCallback(async () => {
    const network = await wallet.getNetwork();
    if (network.chainId !== NAME2ID_MAP[state.network]) {
      await wallet.switchNetwork(Name2CHAIN_MAP[state.network]);
    }
  }, [wallet, state.network]);
};
