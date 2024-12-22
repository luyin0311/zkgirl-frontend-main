import { ID2CHAIN_MAP } from '@c3/chain';
import { getReadableError } from '@src/common/error';
import { AllChainIds } from '@src/constants/baseChainDataById';
import { useWalletRef } from '@src/hooks/useWalletRef';
import { useGlobalStore } from '@src/store/globalStore';
import { useCallback } from 'react';

import { useSwitchNetwork } from './useSwitchNetwork';

export type CB = (...args: any[]) => Promise<any>;
export type RetFn = (ensuerChainId: AllChainIds, cb: CB) => Promise<any>;
export type ExeContractOption = { needLogin: boolean };

export const useExeContract = (): RetFn => {
  const walletRef = useWalletRef();
  const switchChain = useSwitchNetwork();
  const { action } = useGlobalStore(s => s);

  return useCallback(
    async (ensuerChainId: AllChainIds, cb: CB, option: ExeContractOption = { needLogin: true }) => {
      try {
        const provider = await switchChain(ID2CHAIN_MAP[ensuerChainId].shortName, option.needLogin);
        const account = await walletRef.current.connectAccount();
        return await cb(provider, account);
      } catch (e: any) {
        console.error(e);
        if (e.cause !== 'api') {
          // message.destroy();
          // message.error(getReadableError(e));
          const msg = getReadableError(e);
          if (msg) {
            action.update({ message: { type: 'error', content: msg } });
          }
        }
        throw e;
      }
    },
    [switchChain, walletRef, action]
  );
};
