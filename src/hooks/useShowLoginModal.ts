import { useLatest } from '@c3/react';
import { waitFor } from '@c3/utils';
import { useGlobalStore } from '@src/store/globalStore';
import { useCallback } from 'react';

import { useIsLogined } from './useIsLogined';
import { useSwitch2Opbnb } from './useSwitch2Opbnb';

export const useShowLoginModal = () => {
  const { state, action } = useGlobalStore(s => s);
  const globalRef = useLatest(state);
  const isLogined = useIsLogined();
  const isLoginedRef = useLatest(isLogined);

  return useCallback(async () => {
    action.update({ showLoginModal: true, loginModalRejected: false });
    await waitFor(() => !!globalRef.current?.showLoginModal);
    await waitFor(
      () => {
        return !!isLoginedRef?.current;
      },
      () => !!globalRef.current?.loginModalRejected && !globalRef.current.showLoginModal
    );

    if (globalRef.current?.loginModalRejected) {
      throw new Error('login modal rejected');
    }
  }, [action, globalRef, isLoginedRef]);
};
