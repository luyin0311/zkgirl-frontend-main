import { useApi } from '@c3/api';
import { fetchUserInfoApi } from '@src/api/account/fetchUserInfo';
import { useGlobalStore } from '@src/store/globalStore';

export const useFetchUserInfo = () => {
  const [, fetch] = useApi(fetchUserInfoApi);
  const { action } = useGlobalStore(s => s);
  return async () => {
    const user = await fetch(undefined);
    sessionStorage.setItem('login_user', JSON.stringify(user));
    action.update({ user });
    return user;
  };
};
