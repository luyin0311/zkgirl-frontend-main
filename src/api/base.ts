import { initMakeApi } from '@c3/api';
import { exceptionWarn } from '@src/common/log';
import { message } from 'antd';
import { AxiosResponse, default as _axios } from 'axios';

import { makeAxios } from './common/makeAxios';

//@ts-ignore
window.__env = import.meta.env;

const axios = makeAxios({
  config: {
    baseURL: import.meta.env.MODE === 'development' ? '/api/' : import.meta.env.REACT_APP_BASE_URL,
    timeout: 0,
    withCredentials: true,
    responseType: 'json',
  },
  interceptor: {
    response: [
      (res: AxiosResponse) => {
        const { data } = res;
        return Promise.resolve(data);
      },
      error => {
        const dontShowErrorMsgList = [
          'api/user/profile',
          'api/point/community',
          'api/point/influencer',
          'nfts/community',
          // 'api/point/influencer',
          'api/nfts/receipt',
          'api/nfts/mint',
          'receipt_proof/generate',
          'api/nfts/types',
        ];
        const forwardErrorList = [] as string[];
        const url = error?.request?.responseURL || '';
        const inWhiteList = dontShowErrorMsgList.some(e => url.includes(e));
        const errorMsg = error?.response?.data?.message || error.message || 'Something went wrong';
        if (!inWhiteList) {
          message.error(errorMsg);
        }
        exceptionWarn('api', url, 'body:', error?.response?.config?.data, error);
        console.error(errorMsg);
        if (forwardErrorList.some(e => url.includes(e))) {
          throw error?.response?.data || {};
        }
        throw new Error(errorMsg, { cause: 'api' });
      },
    ],
  },
});

export const makeApi = initMakeApi({ rawHttp: axios });
export default axios;

//@ts-ignore
window.__axios = axios;

//@ts-ignore
window.___axios = _axios;
