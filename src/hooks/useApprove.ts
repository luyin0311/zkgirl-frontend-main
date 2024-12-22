import { runContractMethodWithIncreatedGasLimit } from '@src/common/gasLimit';
import { ErcType } from '@src/common/type';
import { BaseChainDataItemType } from '@src/components/ChainSelector/type';
import { createERC721Contracts } from '@src/components/Erc721/createERC721Contracts';
import { createERC1155Contracts } from '@src/components/ERC1155/createContract';
import { useCallback } from 'react';

import { useExeContract } from './useExeContract';

export type ApproveStatus = 'not-approved' | 'doing' | 'approved' | 'fail';
export const useApprove = () => {
  const exe = useExeContract();
  return useCallback(
    async (
      tokenAddress: string,
      tokenId: number,
      ercType: ErcType,
      sourceChain: BaseChainDataItemType,
      approveTo: string,
      updateApproveStatus: (status: ApproveStatus) => void
    ) => {
      return exe(sourceChain.chain.chainId, async (provider, account) => {
        try {
          let r;
          switch (ercType) {
            case 'erc721':
              {
                const erc721Contract = (await createERC721Contracts(provider, tokenAddress))[1];
                updateApproveStatus('doing');
                r = await runContractMethodWithIncreatedGasLimit(erc721Contract, 'approve', [approveTo, tokenId]);
              }
              break;
            case 'erc1155':
              {
                const erc1155Contract = (await createERC1155Contracts(provider, tokenAddress))[1];
                updateApproveStatus('doing');
                //TODO:FIXME: 这里传入approved 传入true是不是有问题?
                r = await runContractMethodWithIncreatedGasLimit(erc1155Contract, 'setApprovalForAll', [approveTo, true]);
              }
              break;
            default:
              console.log('erctype=', ercType);
              throw new Error('only support ERC1155 or ERC721');
          }
          await r.wait();
          updateApproveStatus('approved');
        } catch (e: any) {
          updateApproveStatus('fail');
          // if (e.cause !== 'api') {
          //   message.error(getReadableError(e));
          // }
          throw e;
        }
      });
    },
    [exe]
  );
};
