import { makeApi } from '@src/api/base';

export type parseUriRawReqParameter = {
  tokenUri: string;
};
export type parseUriReqParameter = {
  uri: string;
};
// export type GetProofRawResBody = {
//   proof_blob: string;
//   merkle_proof: string[];
//   proof_index: number;
// };
// export type GetProofResBody = GetProofRawResBody;
export const parseUriApi = makeApi<parseUriRawReqParameter, parseUriReqParameter, any, any>({
  url: '/receipt_proof/parse_uri',
  method: 'post',
  genReqParameter: option => ({
    uri: option.tokenUri,
  }),
  mockData: {},
});
