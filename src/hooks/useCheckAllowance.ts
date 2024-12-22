import { getValidRpcV2 } from '@src/common/getValidRpc';
import { createERC20Contracts } from '@src/components/Erc20/createContract';
import { baseChainDataById, BaseChainId } from '@src/constants/baseChainDataById';
import { ethers } from 'ethers';
import { useCallback } from 'react';

//===========================================================
// ERC20合约的allowance
//===========================================================
export const useCheckErc20Allowance = () => {
  return useCallback(async (chainId: BaseChainId, Erc20ContractAddress: string, owner: string, spender: string) => {
    const rpc = getValidRpcV2(baseChainDataById[chainId]);
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const [r] = await createERC20Contracts(provider, Erc20ContractAddress);
    return r.allowance(owner, spender);
  }, []);
};
