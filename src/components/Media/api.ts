import { makeApi } from '@src/api/base';

import { MediaCategory } from '.';

type GetFileTypeRawReqParameter = { id: string };
type GetFileTypeResBody = {
  data: MediaCategory;
};
export const getFileTypeApi = makeApi<GetFileTypeRawReqParameter, GetFileTypeRawReqParameter, GetFileTypeResBody, GetFileTypeResBody>({
  method: 'get',
  url: '/nfts/types/:id',
  mockData: {
    data: 'image',
  },
});
