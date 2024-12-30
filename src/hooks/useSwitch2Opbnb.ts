import { Name2CHAIN_MAP, NAME2ID_MAP } from '@c3/chain';
import { useWallet } from '@c3/crypto';
import { expchainData } from '@src/common/expchainData';
import { useBalanceStore } from '@src/pages/Mint/store/store';
import { useCallback } from 'react';  

export const useSwitch2Opbnb = () => {
  const wallet = useWallet();
  console.log('wallet',wallet);
  const { state } = useBalanceStore(s => s);
  console.log('state',state);
  return useCallback(async () => {
    const network = await wallet.getNetwork();
    console.log('network',network); 
    if (network.chainId !== expchainData.chainId) {
      await wallet.switchNetwork(expchainData);
    }
  }, [wallet, state.network]);
};
