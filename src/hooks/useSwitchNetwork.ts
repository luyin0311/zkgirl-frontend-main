import { Name2CHAIN_MAP } from '@c3/chain';
import { expchainData } from '@src/common/expchainData';
import { AllChainName } from '@src/constants/baseChainDataById';
import { useCallback } from 'react';

import { useIsLogined } from './useIsLogined';
import { useShowLoginModal } from './useShowLoginModal';
import { useWalletRef } from './useWalletRef';

export const useSwitchNetwork = () => {
  const walletRef = useWalletRef();
  const login = useIsLogined();
  const showLoginModal = useShowLoginModal();

  return useCallback(
    async (shortName: AllChainName, needLogin = true) => {
      if (!login && needLogin) {
        await showLoginModal();
      }
      if (!walletRef.current) {
        throw new Error('walletRef.current is null');
      }
      const account = await walletRef.current.connectAccount();
      // const nw = await walletRef.current?.getNetwork();
      // let provider = walletRef.current?.provider;
      // if (nw.chainId !== ensuerChainId) {
      //如果网络相同，是不会提示切换的。
      console.log('切换网络', Name2CHAIN_MAP[shortName]);
      return await walletRef.current.switchNetwork(expchainData);
      // }
    },
    [login, showLoginModal, walletRef]
  );
};
