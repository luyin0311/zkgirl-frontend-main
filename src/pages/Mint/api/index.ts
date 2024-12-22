import { request } from '@src/common/request';

export type IGetHistoryReq = {
  pageStart: number;
  pageSize: number;
  userAddress: string;
  orderId?: number;
  sourceChainId: number;
  pid?: number;
};

export type IHistoryEntity = {
  id: string;
  sourceChainId: number;
  orderId: string;
  seed: string[];
  signature: string[];
  expectedRandom: string[];
  to: string;
  ticketContract: string;
  ticketAmount: string;
  ticketTokenId: string;
  state: number;
  commitHash: string;
  mintHash: string;
  claimHash: string;
  commitAt: number;
  claimConfirmAt: number;
  nft: INFTEntity[];
  ignore: boolean;
  errors?: any;
  checkErrors?: any;
  created_at: string;
  updated_at: string;
  poolId: number | null;
};

export type INFTEntity = {
  contract: string;
  tokenId: string;
  imgUrl: string;
  nftName: string;
  level: 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Special';
};

export function getHistory(data: IGetHistoryReq): IPromise<IList<IHistoryEntity[]>> {
  return request('/bridge/ZkgirlMintOrders', {
    method: 'GET',
    params: data,
  });
}

export type IGetPoolReq = {
  pageStart: number;
  pageSize: number;
  sourceChainId: number;
  pid?: number;
};

export type IGetPoolEntity = {
  MajorContract: string;
  majorAppChainId: number;
  nftName: string;
  nftDesc: string;
  level: string;
  nftImageUrl: string;
  contractStandard: string;
  majorMetaData: string;
  mapperReponses: {
    mapperContract: string;
    mapperAppChainId: number;
    mapperMetaData: string;
  }[];
};

export function getPool(data: IGetPoolReq): IPromise<IList<IGetPoolEntity[]>> {
  return request('/nfts/pool', {
    method: 'GET',
    params: data,
  });
}
