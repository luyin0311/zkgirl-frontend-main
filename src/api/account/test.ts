import { mock } from '@c3/test';
import _ from 'lodash';

import { makeApi } from '../base';

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

type IRawUserInfo = {
  id: string;
  email: string;
  name: string;
  description: string;
  topCommunities: RawTopCommunityInfo[];
  referenceCode: string;
  referencedRank: number;
  status: number;
  publicKey: string;
  referenceCodeUsedCount: number;
  nfts: INFTInfo[];
  balances: IBalanceInfo[];
  lastLoginTime: number;
  createdAt: string;
};
export type IUserProfile = Omit<IRawUserInfo, 'TopCommunities'> & {
  TopCommunities: TopCommunityInfo[];
};

export const fetchUserInfo = makeApi<undefined, undefined, IRawUserInfo, IUserProfile>({
  method: 'post',
  url: '/user/getSignature',
  defaultData: {
    TopCommunities: [] as TopCommunityInfo[],
    balances: [] as IBalanceInfo[],
    nfts: [] as INFTInfo[],
  } as IUserProfile,
  convert: raw => {
    return {
      ...raw,
      TopCommunities: raw.topCommunities.map(e => ({
        ...e,
        iconUrl: e.avatar.uri,
      })),
    };
  },

  mockData: {
    id: '61a83ca74081f13f5c58a178',
    email: 'hello@legend.network',
    referenceCode: '385908664344510466',
    topCommunities: _.times(3, x => ({
      avatar: { uri: mock.getRandomPic() },
      createdAt: '2022-02-17T04:43:48.62Z',
      id: mock.getId(),
      influencers: ['61b14f57bcb81179cb3f6687', '61a5a9c39dff834623ce17c8', '61ab245a8c68726102cb4bb0'],
      introContent:
        'The legend football community provides a space for 3.5 billion international football fans to interact with top-tier football celebrities, with special virtual/in-person events for everyone. Fans will be able to interact with celebrities in various ways including sharing social media content, trading celebrity NFTs, and interacting with fan tokens. ',
      introImages: [
        {
          uri: 'https://xxxxx-img.s3.us-west-2.amazonaws.com/Website+Intro/jr2.jpeg',
        },
      ],
      name: 'Football Community',
      totalPoints: x == 0 ? 21 : 15,
    })),
    name: 'legend game',
    createdAt: '2022-01-07T08:38:39.264Z',
    description: 'descrioption',
    referencedRank: 28,
    status: 1,
    publicKey: '0xba31D4872B52B2D017D5FD06e51cF1728770340c',
    lastLoginTime: 1638514226,
    // balance: 200,
    referenceCodeUsedCount: 22,
    get nfts() {
      return _.times(999, x => ({
        uri: mock.getRandomPic(),
        title: 'NFT Title',
        subTitle: 'NFT SubTitle NFT SubTitleNFT SubTitleNFT SubTitleNFT SubTitle',
        description: 'More content hereeeeeeeeee More content hereeeeeeeeee More content hereeeeeeeeee More content hereeeeeeeeee',
      }));
    },
    balances: [
      {
        tokenType: 'OR',
        amount: 123,
        currency: 'OR',
      },
      {
        tokenType: 'OFuel',
        amount: 20000,
        currency: 'OFuel',
      },
    ],
  },
});
