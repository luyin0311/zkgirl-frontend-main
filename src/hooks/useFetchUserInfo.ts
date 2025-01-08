import { useApi } from '@c3/api';
import { fetchUserInfoApi } from '@src/api/account/fetchUserInfo';
import { useGlobalStore } from '@src/store/globalStore';

export const useFetchUserInfo = () => {
  const [, fetch] = useApi(fetchUserInfoApi);
  const { action } = useGlobalStore(s => s);
  return async () => {
    // const user = await fetch(undefined);
    console.log('useFetchUserInfo');
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
    return user;
  };
};
