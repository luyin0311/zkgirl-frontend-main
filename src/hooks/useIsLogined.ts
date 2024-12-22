import { useWallet } from '@c3/crypto';
import { isTokenValid } from '@src/common/isTokenValid';
import { user_logout_event } from '@src/constants/consts';
import { useGlobalStore } from '@src/store/globalStore';
import Cookies from 'js-cookie';
import qs from 'qs';
import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const useHasGotUserInfo = () => {
  // const {
  //   state: { user },
  // } = useGlobalStore(s => s);
  const user = useGlobalStore(store => store.state.user);
  return user && !!user?.id;
};

export const useIsLogined = () => {
  const wallet = useWallet();
  const gotUserInfo = useHasGotUserInfo();
  // todo 这里应该先从本地缓存读取用户信息，然后去后台校验用户信息，失败后再将缓存、cookie清空
  const isLogined = isTokenValid() && gotUserInfo && wallet.account && Cookies.get(wallet.account);
  //@ts-ignore
  window.__isLogined = !!isLogined;
  return !!isLogined;
};

export const useMyAccount = () => {
  const {
    state: { user },
  } = useGlobalStore(s => s);
  return user;
};

export const useMount = (cb: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useLogout = () => {
  const wallet = useWallet();
  const { action } = useGlobalStore(s => s);
  return () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('login_user');
    action.update({ user: undefined });
    window.dispatchEvent(new Event(user_logout_event));
    wallet.account && Cookies.remove(wallet.account);
  };
};

export const useQueryString = () => {
  const location = useLocation();
  return useCallback(() => {
    if (location.search.length > 0) {
      return qs.parse(location.search.slice(1));
    }
    return {};
  }, [location.search]);
};

export const useParamId = () => {
  const para = useParams();
  return para.id || '';
};
