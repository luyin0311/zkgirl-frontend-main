import { isTokenValid } from '@c3/utils';
import { makeApi } from '@src/api/base';

export type ReqParameterX = {
  pageStart: number;
  pageSize: number;
  userAddress: string; //钱包地址
  sourceChainId: number;
};
export type HistoryEntity = {
  id: string;
  sourceChainId: number;
  to: string;
  tokenContract: string;
  tokenId: string;
  amount: string;
  imageUrl: string;
  ticketType: string;
  created_at: string;
  updated_at: string;
};
export type NFTEntity = {
  contract: string;
  tokenId: string;
};
export type RawResBody = {
  data: HistoryEntity[];
  total: number;
};
export type ResBody = {
  list: HistoryEntity[];
  total: number;
};

export const fetchHistory = makeApi<ReqParameterX, ReqParameterX, RawResBody, ResBody>({
  method: 'get',
  url: '/bridge/ZkgirlTicketRecords',
  genReqParameter: raw => {
    return {
      ...raw,
    };
  },
  preCondition: () => isTokenValid(),
  convert: body => {
    return { list: body.data, total: body.total };
  },
  mockData: {
    data: [],
    total: 0,
  },
});
