import { URL } from '@c3/types';
import { urlPath } from '@src/constants/urlPath';
import { useCallback } from 'react';
import { redirect, useNavigate } from 'react-router';

import { useFetchUserInfo } from './useFetchUserInfo';

export type LoginParams = { redirect: boolean | URL };
export const useRefreshUser = () => {
  const fetch = useFetchUserInfo();
  const action = useCallback(
    async (cb: () => Promise<number | undefined | void>) => {
      const ret = await cb();
      if (ret === -1) {
        return -1;
      }
      await fetch();
    },
    [fetch]
  );
  return action;
};
