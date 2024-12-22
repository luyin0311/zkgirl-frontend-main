import { makeApi } from '../base';
import { mockUser } from './mock';

export interface INFTInfo {
  uri: string;
  title: string;
  subTitle: string;
  description: string;
}
export type IBalanceInfo = {
  tokenType: 'OFuel' | 'OR';
  amount: number;
  currency: string;
};

export type RawTopCommunityInfo = {
  avatar: { uri: string };
  createdAt: string;
  id: string;
  influencers: string[];
  introContent: string;
  introImages: { uri: string }[];
  name: string;
  totalPoints: number;
};
type TopCommunityInfo = Pick<RawTopCommunityInfo, 'id' | 'name' | 'totalPoints'> & {
  iconUrl: string;
};

export type IRawUserInfo = {
  id: string;
  email: string;
  name: string;
  description: string;
  status: number;
  publicKey: string;
  referenceCodeUsedCount: number;
  lastLoginTime: number;
  createdAt: string;
};
export type IUserProfile = Omit<IRawUserInfo, 'TopCommunities'> & {
  // TopCommunities: TopCommunityInfo[];
};

export const fetchUserInfoApi = makeApi<undefined, undefined, IRawUserInfo, IUserProfile>({
  method: 'get',
  url: '/user/profile',
  defaultData: {} as IUserProfile,
  convert: raw => {
    return {
      ...raw,
    };
  },

  mockData: mockUser,
});
