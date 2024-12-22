import { request } from '@src/common/request';

export type IGetHistoryReq = {
  pageStart: number;
  pageSize: number;
  userAddress: string;
  sourceChainId: number;
};

export type IHistoryEntity = {
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

export function getHistory(data: IGetHistoryReq): IPromise<IList<IHistoryEntity[]>> {
  return request('/bridge/ZkgirlTicketRecords', {
    method: 'GET',
    params: data,
  });
}

export type IGetPartnerSignReq = {
  userAddress: string;
  sourceChainId: number;
};

export type ISignEntity = {
  PartnerName: string;
  To: string;
  TokenId: number;
  Amount: number;
  Epoch: number;
  ExpireTime: number;
  JwtExpireTime: number;
  Signature: string;
};

export function getPartnerSign(data: IGetPartnerSignReq): IPromise<IResponse<ISignEntity[]>> {
  return request('/partner/ticket/zkgirlSignature', {
    method: 'GET',
    params: data,
  });
}
