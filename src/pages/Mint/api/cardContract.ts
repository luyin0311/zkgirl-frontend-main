import { createContract } from '@c3/crypto';
import { ethers } from 'ethers';

import {
  CardABI,
 } from '../abi';



export const cardContract = (provider: ethers.providers.Web3Provider, contractAddress: string) => {
  const r = createContract(contractAddress, CardABI, provider);
  if (!r) {
    throw new Error('getContract failed');
  }
  return r;
};


