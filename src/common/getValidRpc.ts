import { Chain, ID2CHAIN_MAP, Name2CHAIN_MAP, RawChainType } from '@c3/chain';
import { BaseChainDataItemType } from '@src/components/ChainSelector/type';
import { AllChainName } from '@src/constants/baseChainDataById';

export const getValidRpc = (chain: Chain) => {
  if (chain.shortName === 'eth') {
    return 'https://cloudflare-eth.com';
  }
  if (chain.shortName === 'gor') {
    return 'https://rpc.ankr.com/eth_goerli';
  }
  if (chain.shortName === 'sep') {
    return 'https://rpc-sepolia.rockx.com';
  }

  const rpc = chain.rpcUrls.find(e => !e.includes('API_KEY'));
  if (!rpc) {
    throw new Error('rpc is undefined');
  }
  return rpc;
};

//确保使用到了配置过的新地址
export const getValidRpcV2 = (chain: BaseChainDataItemType) => {
  return getValidRpc(chain.chain);
};

export const getValidRpcByChainId = (chainId: RawChainType['chainId']) => {
  const chain = ID2CHAIN_MAP[chainId];
  return getValidRpc(chain);
};

export const getValideRpcByChainName = (chainName: AllChainName) => {
  const chain = Name2CHAIN_MAP[chainName];
  return getValidRpc(chain);
};

export const getValidRpcs = (chainName: string) => {
  switch (chainName) {
    case 'eth':
      return [
        'https://eth.drpc.org',
        'https://eth.llamarpc.com',
        'https://ethereum-rpc.publicnode.com',
        'https://rpc.mevblocker.io',
        'https://eth-pokt.nodies.app',
        'https://cloudflare-eth.com',
        'https://eth.llamarpc.com',
        'https://ethereum-rpc.publicnode.com',
      ];
    case 'bnbt':
      return ['https://data-seed-prebsc-2-s3.bnbchain.org:8545', 'https://data-seed-prebsc-2-s1.binance.org:8545'];
    case 'bnb':
      return [
        'https://bsc-dataseed1.binance.org',
        'https://bsc-dataseed2.binance.org',
        'https://bsc-dataseed3.binance.org',
        'https://bsc-pokt.nodies.app',
        'https://binance.llamarpc.com',
      ];
    case 'sep':
      return ['https://rpc-sepolia.rockx.com', 'https://rpc.sepolia.org'];
    case 'opbnb_mainnet':
      return ['https://rpc1-testnet.expchain.ai', 'https://opbnb-rpc.publicnode.com', 'https://1rpc.io/opbnb'];
    case 'zkj':
      return ['https://rpc1-testnet.expchain.ai'];
    default:
      throw new Error('invalid chainName');
  }
};

export const getRpc = (chainName: string) => {
  if (chainName === 'eth') {
    return 'https://cloudflare-eth.com';
  }
  if (chainName === 'gor') {
    return 'https://rpc.ankr.com/eth_goerli';
  }
  if (chainName === 'sep') {
    return 'https://rpc-sepolia.rockx.com';
  }
  if (chainName === 'zkj') {
    return 'https://rpc1-testnet.expchain.ai';
  }
};
