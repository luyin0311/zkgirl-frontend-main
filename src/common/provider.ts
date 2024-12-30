import { NAME2ID_MAP } from '@c3/chain';
import { JsonRpcProvider } from '@ethersproject/providers';
import { getValidRpcs } from '@src/common/getValidRpc';
import { ethers } from 'ethers';

export const handleProvider = async (
  walletChainId: number,
  chainName: string,
  provider?: ethers.providers.Web3Provider
): Promise<ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | undefined> => {
  const chainId = (NAME2ID_MAP as any)[chainName];
  if (walletChainId !== chainId) {
    const rpcs = getValidRpcs(chainName);
    console.log('chainName', chainName);
    for (const rpc of rpcs) {
      try {
        const provider = new JsonRpcProvider(rpc);
        await provider.getBlockNumber();
        console.log('[log] use rpc', rpc);
        console.log('provider', provider);
        return provider;
      } catch (e) {
        console.error(e);
      }
    }
  }
  return provider;
};
