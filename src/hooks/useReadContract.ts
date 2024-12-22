import { createContract } from '@c3/crypto';
import { JsonRpcProvider } from '@ethersproject/providers';
import { BaseContract, ContractInterface } from 'ethers';
import { useCallback } from 'react';

export const useReadContract = <T extends BaseContract>() => {
  return useCallback(async (contractAddress: string, rpc: string, abi: ContractInterface, method: keyof T, args: any[] = []) => {
    const [r] = createContract(contractAddress, abi, new JsonRpcProvider(rpc)) as unknown as [T, T];
    const myMethod = r[method];
    if (typeof myMethod === 'function') {
      return myMethod(...args);
    }
    throw new Error('myMethod is not a function');
  }, []);
};
