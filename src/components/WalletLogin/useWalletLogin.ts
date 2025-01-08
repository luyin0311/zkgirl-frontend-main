import { WalletName } from '@c3/crypto';
import { loginByWallet } from '@src/api/login';
import { getPublicKeyValidationMessage } from '@src/api/wallet';
import { useWalletRef } from '@src/hooks/useWalletRef';
import { useGlobalStore } from '@src/store/globalStore';
import { useCallback } from 'react';

import { useRefreshUser } from '../../hooks/useRefreshUser';

export const useWalletLogin = () => {
  const walletRef = useWalletRef();
  const { action } = useGlobalStore(s => s);
  // const waitForProvider = useWaitForProvider(wallet);
  const doWork = useRefreshUser();
  return useCallback(
    (name: WalletName) => {
      console.log('walletRef', walletRef);
      return doWork(async () => {
        console.log('useWalletLogin');
        const provider = await walletRef.current?.switchProvider(name);
        const account = (await provider.send('eth_requestAccounts', []))[0];
        const { message } = await getPublicKeyValidationMessage(account);
        // const message = 'Welcome to Shovelverse.';
        const signedMessage = await provider?.getSigner(account).signMessage(message);
        //metamask 确认之后
        console.log('provider', provider);
        console.log('account', account);
        console.log('message', message);
        console.log('signedMessage', signedMessage);

        const user = {
            'id': '677d100ea64823af481d3349',
            'publicKey': '0x8dbd6994ce8380b4acc5cae7281cfec569971324',
            'referenceCode': '548144806988087823',
            'status': 1,
            'isAdmin': false,
            'adminRoles': null,
            'pointRank': 0,
            'totalPoints': 0,
            'invitationPoints': 0,
            'pointLevel': 0,
            'lastLoginTime': 1736303050,
            'createdAt': '2025-01-07T11:29:18.973Z',
            'lastUpdatedAt': '2025-01-08T02:24:10.011Z',
            'topCommunities': [],
            'email': '',
            'name': '',
            'description': '',
            'referenceCodeUsedCount': null
        };
        sessionStorage.setItem('login_user', JSON.stringify(user));
        action.update({ user });
        // await loginByWallet({
        //   publicKey: account,
        //   signedMessage: signedMessage || '',
        // });
      });
    },
    [doWork, walletRef]
  );
};
