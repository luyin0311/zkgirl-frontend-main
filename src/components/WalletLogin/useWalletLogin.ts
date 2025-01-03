import { WalletName } from '@c3/crypto';
import { loginByWallet } from '@src/api/login';
import { getPublicKeyValidationMessage } from '@src/api/wallet';
import { useWalletRef } from '@src/hooks/useWalletRef';
import { useCallback } from 'react';

import { useRefreshUser } from '../../hooks/useRefreshUser';

export const useWalletLogin = () => {
  const walletRef = useWalletRef();
  // const waitForProvider = useWaitForProvider(wallet);
  const doWork = useRefreshUser();
  return useCallback(
    (name: WalletName) => {
      console.log('walletRef', walletRef);
      return doWork(async () => {
        const provider = await walletRef.current?.switchProvider(name);
        const account = (await provider.send('eth_requestAccounts', []))[0];
        const { message } = await getPublicKeyValidationMessage(account);
        const signedMessage = await provider?.getSigner(account).signMessage(message);
        console.log('provider', provider);
        console.log('account', account);
        console.log('message', message);
        console.log('signedMessage', signedMessage);
        await loginByWallet({
          publicKey: account,
          signedMessage: signedMessage || '',
        });
      });
    },
    [doWork, walletRef]
  );
};
