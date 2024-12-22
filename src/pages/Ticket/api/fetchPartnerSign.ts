import { isTokenValid } from '@c3/utils';
import { makeApi } from '@src/api/base';

export type ReqParameterX = {
  userAddress: string;
  sourceChainId: number;
};

export type SignEntity = {
  PartnerName: string;
  To: string;
  TokenId: number;
  Amount: number;
  Epoch: number;
  ExpireTime: number;
  JwtExpireTime: number;
  Signature: string;
};

export type ResBody = {
  code: number;
  data: SignEntity[];
  message: string;
};

export type ResBody2 = {
  code: number;
  data: {
    To: string;
    TokenId: number;
    ConsumerIds: string[];
    Signature: string;
  };
  message: string;
};

export const fetchPartnerSign = makeApi<ReqParameterX, ReqParameterX, ResBody, ResBody>({
  method: 'get',
  url: '/partner/ticket/zkgirlSignature',
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
    code: 200,
    message: '',
    data: [
      {
        PartnerName: '',
        To: '',
        TokenId: 0,
        Amount: 0,
        Epoch: 0,
        ExpireTime: 0,
        JwtExpireTime: 0,
        Signature: '',
      },
    ],
  },
});

export type ReqParameterX2 = {
  userAddress: string;
  sourceChainId: number;
};

export const fetchPartnerDailySign = makeApi<ReqParameterX2, ReqParameterX2, ResBody2, ResBody2>({
  method: 'get',
  url: '/partner/ticket/daily_signature',
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
    code: 200,
    message: '',
    data: {
      To: '',
      TokenId: 107,
      ConsumerIds: [],
      Signature: '',
    },
  },
});

export type ReqAirdropTickSign = {
  userAddress: string;
};

export type PartnerDailySignResBody = {
  code: number;
  data: SignEntity;
  message: string;
};

export const fetchAirdropTickSign = makeApi<ReqAirdropTickSign, ReqAirdropTickSign, PartnerDailySignResBody, PartnerDailySignResBody>({
  method: 'get',
  url: '/airdrop/ticket/sign',
  preCondition: () => isTokenValid(),
  convert: body => {
    return body;
  },
  mockData: {
    code: 200,
    message: '',
    data: {
      PartnerName: '',
      To: '',
      TokenId: 0,
      Amount: 0,
      Epoch: 0,
      ExpireTime: 0,
      JwtExpireTime: 0,
      Signature: '',
    },
  },
});
