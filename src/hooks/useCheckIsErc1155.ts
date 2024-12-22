import { RawChainType } from '@c3/chain';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { getValidRpcByChainId } from '@src/common/getValidRpc';
import { createERC1155Contracts } from '@src/components/ERC1155/createContract';

export const useCheckIsErc1155 = () => {
  return async (contractAddress: string, chainId: RawChainType['chainId'], provider_?: Web3Provider | JsonRpcProvider) => {
    const provider = provider_ || new JsonRpcProvider(getValidRpcByChainId(chainId));

    const [r] = await createERC1155Contracts(provider, contractAddress);
    return r.supportsInterface('0xd9b67a26');
  };
};
