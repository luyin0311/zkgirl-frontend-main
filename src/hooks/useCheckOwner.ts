import { JsonRpcProvider } from '@ethersproject/providers';
import { getValidRpcByChainId } from '@src/common/getValidRpc';
import { ErcType } from '@src/common/type';
import { createERC721Contracts } from '@src/components/Erc721/createERC721Contracts';
import { AllChainIds } from '@src/constants/baseChainDataById';
import { ethers } from 'ethers';
import { useCallback } from 'react';

import { useGetErcType } from './useGetErcType';

export const useCheckTokenOwner = () => {
  const getErcType = useGetErcType();
  return useCallback(
    async (
      tokenAddress: string,
      tokenId: number,
      sourceAccount: string,
      ercType: ErcType,
      // action: any,
      chainId: AllChainIds,
      provider_?: JsonRpcProvider | ethers.providers.Web3Provider
    ) => {
      const provider = provider_ || new JsonRpcProvider(getValidRpcByChainId(chainId));

      //判断是否是合约所有者
      switch (ercType) {
        case 'erc721': {
          const OWN_ERRO_MSG = 'You are not the owner of this NFT';
          try {
            const [r, w] = await createERC721Contracts(provider, tokenAddress);
            const owner = await r.ownerOf(tokenId);
            if (owner.toLowerCase() !== sourceAccount.toLowerCase()) {
              throw new Error(OWN_ERRO_MSG);
            }
          } catch (e: any) {
            console.warn('tokenId', tokenId, e);
            if (e.message === OWN_ERRO_MSG) {
              throw e;
            }
            throw new Error('Unstable rpc connection. Please check or renew your rpc configuration in your wallet.');
          }
          break;
        }
        case 'erc1155': {
          //TODO:
          break;
        }
        default:
          throw new Error('only support ERC1155 or ERC721');
      }
    },
    []
  );
};
