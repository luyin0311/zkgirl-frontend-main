interface ExpchainData {
  chainId: number;
  rpcUrls: string[];
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  iconUrls: string[];
  shortName: string;
  blockExplorerUrls: string[];
}
export const expchainData:ExpchainData  = {
  'chainId': 18880,
  'rpcUrls': [
      'https://rpc1-testnet.expchain.ai'
  ],
  'chainName': 'EXPchain Testnet',
  'nativeCurrency': {
    name: 'tZKJ',
    symbol: 'tZKJ',
    decimals: 18,
  },
  'iconUrls': [],
  'shortName': 'zkj',
  'blockExplorerUrls': [
      'https://blockscout-testnet.expchain.ai/'
  ]
};
