import { createContract } from '@c3/crypto';
import { ethers } from 'ethers';

import { ERC1155_ABI, ERC1155Contract } from './abi';

export const createERC1155Contracts = async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  contractAddress: string
): Promise<[ERC1155Contract, ERC1155Contract]> => {
  const r = createContract(contractAddress, ERC1155_ABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r as unknown as [ERC1155Contract, ERC1155Contract];
};

//@ts-ignore
window.__createER1155Contracts = createERC1155Contracts;
