import { isTokenValid } from '@c3/utils';
import { makeApi } from '@src/api/base';

export type ReqParameterX = {
  address: string;
  cycle: number;
  appChainId: number;
};

export type SignEntity = {
  address: string;
  tickets: number;
  cycle: number;
  signature: string;
};
export type RawResBody = {
  data: SignEntity;
};
export type ResBody = {
  data: SignEntity;
};

export const fetchPandraSign = makeApi<ReqParameterX, ReqParameterX, RawResBody, ResBody>({
  method: 'post',
  url: '/pandra/sign',
  genReqParameter: raw => {
    return {
      ...raw,
    };
  },
  preCondition: () => isTokenValid(),
  convert: body => {
    return { data: body.data };
  },
  mockData: {
    data: {
      address: '0xb0a9f4f7fb13c79bc79bfb44541aedffe372d0e6',
      tickets: 5,
      cycle: 0,
      signature:
        '0x16c9e5392896a6c235740b667bab26bf93c473f468c8352b209907980a462ee41dc44da5af20b635de7dfa8d238a01111c87312d94e027d807b252ed6c857a2c1b',
    },
  },
});
