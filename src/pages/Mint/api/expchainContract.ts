import { createContract } from '@c3/crypto';
import { ethers } from 'ethers';

import {
  CardSystemABI,
 } from '../abi';



export const expchainContract = (provider: ethers.providers.Web3Provider, contractAddress: string) => {
  const r = createContract(contractAddress, CardSystemABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r;
};


