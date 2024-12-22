import { RawChainType } from '@c3/chain';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { getValidRpcByChainId } from '@src/common/getValidRpc';
import { createERC721Contracts } from '@src/components/Erc721/createERC721Contracts';

export const useCheckIsErc721 = () => {
  return async (tokenAddress: string, chainId: RawChainType['chainId'], provider_?: Web3Provider | JsonRpcProvider) => {
    const provider = provider_ || new JsonRpcProvider(getValidRpcByChainId(chainId));
    const [r] = await createERC721Contracts(provider, tokenAddress);
    return r.supportsInterface('0x80ac58cd');
  };
};
