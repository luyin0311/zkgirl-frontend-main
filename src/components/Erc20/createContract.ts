import { createContract } from '@c3/crypto';
import { ethers } from 'ethers';

import { ERC20_ABI, ERC20Contract } from './abi';

export const createERC20Contracts = async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  contractAddress: string
): Promise<[ERC20Contract, ERC20Contract]> => {
  const r = createContract(contractAddress, ERC20_ABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r as unknown as [ERC20Contract, ERC20Contract];
};

//@ts-ignore
// window.__createERC20Contracts = createERC20Contracts;
