import { useWallet } from '@c3/crypto';
import { s } from '@c3/utils';
import { useCallback } from 'react';

import { NetworkUnconnected, supportedNetworks, UnknownNetwork } from './const';

export const useGetNetwork = () => {
  const wallet = useWallet();

  return useCallback(async () => {
    try {
      const network = await wallet.getNetwork();
      console.log(network);
      console.log(s(network.chainId));
      if (!Object.keys(supportedNetworks).includes(s(network.chainId))) {
        throw UnknownNetwork;
      }
      return network;
    } catch (e) {
      console.log(e);
      if (e === UnknownNetwork) {
        throw UnknownNetwork;
      } else {
        throw NetworkUnconnected; //不可能出现这种情况
      }
    }
  }, [wallet]);
};
