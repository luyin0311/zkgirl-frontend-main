import { Fn } from '@c3/types';
import { AllChainName } from '@src/constants/baseChainDataById';

import { getReadableError } from './error';
import { dataIsNotAvailable_UnstableRpcConnection } from './error-const';

export const doIgnoreErrors = async (
  chainName: AllChainName,
  fn: () => Promise<any>
  // errorList: string[] = [dataIsNotAvailable_UnstableRpcConnection] //目前只和polygon有关
) => {
  try {
    return await fn();
  } catch (e: any) {
    console.log('doIgnoreErrors:', e);
    if (e.cause !== 'api') {
      const error = getReadableError(e) || '';
      if (error === dataIsNotAvailable_UnstableRpcConnection && chainName === 'matic') {
        console.log('ignoredError:', error);
        return; //ignore this error
      }
    }
    throw e;
  }
};
