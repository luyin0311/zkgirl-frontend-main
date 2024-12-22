import { JsonRpcProvider } from '@ethersproject/providers';
import { getValidRpcByChainId } from '@src/common/getValidRpc';
import { ErcType } from '@src/common/type';
import { BaseChainDataItemType } from '@src/components/ChainSelector/type';
import { createERC721Contracts } from '@src/components/Erc721/createERC721Contracts';
import { createERC1155Contracts } from '@src/components/ERC1155/createContract';
import { AllChainIds } from '@src/constants/baseChainDataById';
import { ethers } from 'ethers';
import { useCallback } from 'react';

import { useExeContract } from './useExeContract';

export const useIsApproved = () => {
  return useCallback(
    async (
      sourceTokenAddress: string,
      sourceTokenId: number,
      ercType: ErcType,
      chainId: AllChainIds,
      approvedTo: string,
      owner: string,
      provider_?: JsonRpcProvider | ethers.providers.Web3Provider
    ) => {
      const provider = provider_ || new JsonRpcProvider(getValidRpcByChainId(chainId));
      switch (ercType) {
        case 'erc721': {
          const erc721Contract = (await createERC721Contracts(provider, sourceTokenAddress))[0];
          const addr = await erc721Contract.getApproved(sourceTokenId);
          return addr.toLowerCase() === approvedTo.toLowerCase();
        }
        case 'erc1155': {
          const erc1155Contract = (await createERC1155Contracts(provider, sourceTokenAddress))[0];
          return await erc1155Contract.isApprovedForAll(owner, approvedTo);
        }
        default:
          throw new Error('only support ERC1155 or ERC721');
      }
    },
    []
  );
};
