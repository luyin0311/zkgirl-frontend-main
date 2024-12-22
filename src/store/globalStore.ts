import { useLatest } from '@c3/react';
import { waitFor } from '@c3/utils';
import { IUserProfile } from '@src/api/account/fetchUserInfo';
import { mockUser } from '@src/api/account/mock';
import { dbg } from '@src/common/log';
import { useWalletRef } from '@src/hooks/useWalletRef';
import { produce } from 'immer';
import { useCallback } from 'react';
import create from 'zustand';

export type GlobalStore = {
  state: {
    showLoginModal: boolean;
    loginModalRejected: boolean; //点击关闭按钮的，触发rejection操作
    showConnectWalletModal: boolean;
    user: IUserProfile | undefined;
    showMenu: boolean;
    message: {
      type: 'error' | 'success';
      content: string;
    } | null;
  };

  action: {
    update: (info: Partial<GlobalStore['state']>) => void;
  };
};
const isMock = localStorage.getItem('mock');
const sessionUser = sessionStorage.getItem('login_user');

const defaultStates: GlobalStore['state'] = {
  showLoginModal: false,
  showConnectWalletModal: false,
  loginModalRejected: false,
  user: sessionUser ? JSON.parse(sessionUser) : undefined,
  showMenu: false,
  message: null,
};

const mockState: GlobalStore['state'] = {
  showLoginModal: false,
  showConnectWalletModal: false,
  loginModalRejected: false,
  user: mockUser,
  showMenu: false,
  message: null,
};

export const useGlobalStore = create<GlobalStore>(set => ({
  state: isMock ? mockState : defaultStates,
  action: {
    update: payload => {
      set(
        produce(draft => {
          return {
            ...draft,
            state: { ...draft.state, ...payload },
          };
        })
      );
    },
  },
}));

//@ts-ignore
window.__store_global = useGlobalStore.getState;

//只用到域名登录的地方
export const useShowConnectWalletModal = () => {
  const walletRef = useWalletRef();
  const { action, state } = useGlobalStore(s => s);
  const stateRef = useLatest(state);
  return useCallback(async () => {
    action.update({ showConnectWalletModal: true });
    await waitFor(() => !!stateRef.current?.showConnectWalletModal);
    await waitFor(() => !!walletRef.current?.account);
    action.update({ showConnectWalletModal: false });
    dbg('end of show connect wallet modal');
  }, [action, stateRef, walletRef]);
};
