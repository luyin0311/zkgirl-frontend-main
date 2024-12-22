import { isTokenValid } from '@c3/utils';
import { makeApi } from '@src/api/base';

export type ReqParameterX = {
  cycle: number;
  sourceChainId: number;
};

export type StatusEntity = {
  id: string;
  status: boolean;
  cycle: number;
};

export const fetchPandaryStatus = makeApi<ReqParameterX, ReqParameterX, StatusEntity, StatusEntity>({
  method: 'get',
  url: '/nfts/pandaryStatus',
  genReqParameter: raw => {
    return {
      ...raw,
    };
  },
  preCondition: () => isTokenValid(),
  convert: body => {
    return body;
  },
  mockData: {
    id: '0xb0a9f4f7fb13c79bc79bfb44541aedffe372d0e6',
    status: true,
    cycle: 0,
  },
});
