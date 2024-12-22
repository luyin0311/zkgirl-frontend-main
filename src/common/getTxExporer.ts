import { BaseChainDataItemType } from '@src/components/ChainSelector/type';
import { AllChainId, getChainByAppId, getChainByChainId } from '@src/constants/baseChainDataById';

const trimLastSlash = (url: string) => {
  return url.replace(/\/$/, '');
};

export const getTxExplorer = (chain: BaseChainDataItemType, txId: string) => {
  if (chain.txExplorer) {
    return `${trimLastSlash(chain.txExplorer)}/${txId}`;
  }
  return `${trimLastSlash(chain.chain.blockExplorerUrls?.[0] || '')}/tx/${txId}`;
};
export const getTxExplorerByChainId = (chainId: AllChainId, txId: string) => {
  const chain = getChainByChainId(chainId);
  if (!chain) {
    console.error('getTxExplorerByChainId: chain not found', chainId);
    return '';
  }
  return getTxExplorer(chain as BaseChainDataItemType, txId);
};
