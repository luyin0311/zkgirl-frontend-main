import { createContract } from '@c3/crypto';
import { ethers } from 'ethers';

import ERC721_ABI from './ERC721.json';
import { ERC721 as ERC721Contract } from './erc721/ERC721';

export const createERC721Contracts = async (
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider,
  contractAddress: string
): Promise<[ERC721Contract, ERC721Contract]> => {
  const c = createContract(contractAddress, ERC721_ABI, provider);
  if (!c) {
    throw new Error('getContract failed');
  }
  return c as unknown as [ERC721Contract, ERC721Contract];
};
