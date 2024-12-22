import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { getValidRpcByChainId } from '@src/common/getValidRpc';
import { AllChainIds } from '@src/constants/baseChainDataById';
import { useCallback } from 'react';

import { useCheckIsErc721 } from './useCheckIsErc721';
import { useCheckIsErc1155 } from './useCheckIsErc1155';

export const useGetErcType = () => {
  const check721 = useCheckIsErc721();
  const check1155 = useCheckIsErc1155();

  return useCallback(
    async (tokenAddress: string, chainId: AllChainIds, provider_?: Web3Provider | JsonRpcProvider) => {
      const provider = provider_ || new JsonRpcProvider(getValidRpcByChainId(chainId));
      try {
        const is721 = await check721(tokenAddress, chainId, provider_);
        if (is721) {
          return 'erc721';
        }
      } catch (e) {
        console.log(e);
      }

      try {
        const is1155 = await check1155(tokenAddress, chainId, provider);
        if (is1155) {
          return 'erc1155';
        }
      } catch (e) {
        console.log(e);
      }
      throw new Error('Sorry, we only support ERC-721 or ERC-1155 for now.');
    },
    [check1155, check721]
  );
};
