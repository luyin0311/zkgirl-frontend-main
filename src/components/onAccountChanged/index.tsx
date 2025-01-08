import { useOnAccountChanged, useWallet } from '@c3/crypto';
import { useLatest } from '@c3/react';
import { loginByWallet } from '@src/api/login';
import { getPublicKeyValidationMessage } from '@src/api/wallet';
import { isTokenExpired } from '@src/common/isTokenValid';
import { should_ignore_accounts_change_event, user_switch_event } from '@src/constants/consts';
import { useFetchUserInfo } from '@src/hooks/useFetchUserInfo';
import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useIsLogined, useLogout } from '../../hooks/useIsLogined';
import { whitelistPage as whitelistPages } from './constants';
// import { useBindingEmailPromptModal } from './BindingEmailPromptModal';
import { useLoginPromptModal } from './LoginPromptModal';

export const useOnMyAccountChanged = () => {
  const wallet = useWallet();
  const logout = useLogout();
  const walletRef = useLatest(wallet);
  const nav = useNavigate();
  const isLogin = useIsLogined();
  const updateUser = useFetchUserInfo();

  const signupAndLogin = useCallback(async () => {
    const account = walletRef.current?.account || '';
    try {
      // const { message } = await getPublicKeyValidationMessage(account);
      const message = 'Welcome to Shovelverse.';
      const signedMessage = (await walletRef.current?.provider?.getSigner(account).signMessage(message)) || '';
      // await loginByWallet({ publicKey: account, signedMessage });
    } catch (e: any) {
      await logout();
    }
    await updateUser();
  }, [logout, updateUser, walletRef]);

  const switchToStoredAccount = useCallback(
    async (token: string) => {
      localStorage.setItem('token', token);
      await updateUser();
      window.dispatchEvent(new Event(user_switch_event));
    },
    [updateUser]
  );

  const [loginPromptModal, loginPromptModalOn] = useLoginPromptModal(signupAndLogin, async () => {
    await logout();
    // nav(urlPath.home);
  });

  const onAccountChanged = useCallback(
    async (accounts: string[]) => {
      console.log('==>onAccountChanged, accounts=', accounts);
      if (whitelistPages.includes(window.location.pathname)) {
        console.warn(window.location.pathname, 'is in the whitelist page, ignore account change event');
        return;
      }

      if (localStorage.getItem(should_ignore_accounts_change_event)) {
        localStorage.removeItem(should_ignore_accounts_change_event);
        console.warn('account changed, but ignore it,do nothing');
        return;
      }
      if (!isLogin) {
        return;
      }
      if (!accounts.length) {
        logout();
        return;
      }

      //switch to wallet account
      const targetWalletAccount = accounts[0];
      const storedToken = Cookies.get(targetWalletAccount);
      if (storedToken && !isTokenExpired(storedToken)) {
        switchToStoredAccount(storedToken);
      } else {
        await loginPromptModalOn();
      }
    },
    [isLogin, loginPromptModalOn, logout, switchToStoredAccount]
  );
  useOnAccountChanged(wallet.provider, onAccountChanged);

  return [loginPromptModal, loginPromptModalOn] as const;
};
